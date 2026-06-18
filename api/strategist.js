// ─────────────────────────────────────────────────────────────────────────
// /api/strategist.js — Vercel Edge Function
// Phase A: pure streaming proxy for the Anthropic Messages API.
//
// Holds Christina's API key server-side. Browser sends the same request
// shape `streamStrategist` already builds locally; we forward to Anthropic
// and pipe the SSE stream back without modification. Phase B layers
// Supabase-backed conversation memory on top of this same surface.
//
// Why Edge runtime: zero cold-start latency for streaming, native fetch
// streaming support, regional deploys close to the user. Edge functions
// don't support all Node APIs but we don't need any of them here.
//
// regions: ['iad1'] — PIN TO US-EAST (added 2026-06-18). Edge functions
// otherwise execute in the Vercel region closest to the user, so the
// upstream call to api.anthropic.com originates from THERE. Anthropic's API
// is geo-restricted to supported countries; a request from an unsupported
// region (e.g. Argentina) gets bounced with an nginx "405 Not Allowed" HTML
// page, which surfaces in the Studio as `API_405`. Pinning execution to
// US-East means the Anthropic call always originates from a supported region,
// regardless of where the team member sits. Fixes the Studio "Riff with the
// Strategist" error for international users (Guada/Argentina).
// ─────────────────────────────────────────────────────────────────────────

export const config = { runtime: 'edge', regions: ['iad1'] };

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

// CORS — same-origin in production (engine + proxy share the willas domain),
// but development can run index.html from a file:// or localhost origin.
// Allowing all origins is fine because the proxy only accepts POST + the
// API key never leaves the server. No credentials cookie surface.
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Expose-Headers': 'X-Conversation-Id',
  'Access-Control-Max-Age': '86400',
};

// ─── Phase B: Supabase persistence helpers ──────────────────────
// We use the Supabase REST API directly (no npm dep) — simpler in Edge
// runtime, no install/build step. Service-role key bypasses RLS so we
// don't need any client-facing auth surface.
const SUPABASE_ENABLED = !!(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);

async function supabaseInsert(table, row) {
  if (!SUPABASE_ENABLED) return null;
  try {
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        apikey: process.env.SUPABASE_SECRET_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      console.error(`Supabase insert ${table} failed:`, res.status, await res.text());
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (e) {
    console.error(`Supabase insert ${table} threw:`, e);
    return null;
  }
}

async function supabasePatch(table, id, updates) {
  if (!SUPABASE_ENABLED) return;
  try {
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        apikey: process.env.SUPABASE_SECRET_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
  } catch (e) {
    console.error(`Supabase patch ${table} threw:`, e);
  }
}

export default async function handler(req) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return jsonError('Method not allowed. POST only.', 405);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return jsonError('Server misconfigured — ANTHROPIC_API_KEY env var missing.', 500);
  }

  // Parse body
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return jsonError('Invalid JSON in request body.', 400);
  }

  const {
    messages,
    systemExtras,
    model = 'claude-sonnet-4-6',
    maxTokens = 2000,
    enableWebSearch = true,
    // Phase B fields — all optional; if present, the proxy persists turns
    clientId = 'willas',
    agentType,            // 'strategist' | 'studio_riff' | 'brief_riff'
    contextId,            // sticky_id / brief_id / null for global strategist
    userLabel,            // user's name from getUserName() in the client
    conversationId,       // null on first turn; server returns new ID via X-Conversation-Id
  } = body || {};

  // Validate
  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonError('`messages` must be a non-empty array of role/content turns.', 400);
  }

  // Normalize system blocks. Client sends either an array of strings or
  // an array of {type:"text", text:"...", cache_control?:{...}} blocks.
  // We accept both, output the array-of-blocks form Anthropic expects,
  // preserving cache_control on stable prompt blocks (the brand strategist
  // prompt + this week's intel context) so Anthropic skips re-tokenizing
  // them on subsequent turns — cuts cost ~5x on multi-turn conversations.
  const systemBlocks = [];
  if (Array.isArray(systemExtras)) {
    for (const block of systemExtras) {
      if (typeof block === 'string' && block.trim()) {
        systemBlocks.push({ type: 'text', text: block });
      } else if (block && block.type === 'text' && block.text) {
        const out = { type: 'text', text: block.text };
        if (block.cache_control) out.cache_control = block.cache_control;
        systemBlocks.push(out);
      }
    }
  }

  // Build the Anthropic request
  const anthropicBody = {
    model,
    max_tokens: maxTokens,
    messages,
    stream: true,
  };
  if (systemBlocks.length > 0) {
    anthropicBody.system = systemBlocks;
  }
  if (enableWebSearch) {
    anthropicBody.tools = [
      { type: 'web_search_20250305', name: 'web_search', max_uses: 5 },
    ];
  }

  // ─── Phase B: resolve/create conversation + persist user turn ──
  // Only runs if Supabase env vars are configured AND the client passed
  // an agentType (so non-conversation calls — e.g., callClaude one-shots
  // for sticky brief generation — can opt out by not sending agentType).
  let resolvedConversationId = conversationId || null;
  if (SUPABASE_ENABLED && agentType) {
    if (!resolvedConversationId) {
      const conv = await supabaseInsert('conversations', {
        client_id: clientId,
        agent_type: agentType,
        context_id: contextId || null,
        user_label: userLabel || null,
      });
      if (conv && conv.id) resolvedConversationId = conv.id;
    }

    // Persist the LATEST user message (last item in the messages array).
    // We trust the client to send only the new user turn appended to its
    // own history; persisting only the latest avoids duplicates on replay.
    const lastMsg = messages[messages.length - 1];
    if (resolvedConversationId && lastMsg && lastMsg.role === 'user') {
      // Fire-and-forget — don't block the response on persistence
      supabaseInsert('messages', {
        conversation_id: resolvedConversationId,
        role: 'user',
        content: lastMsg.content,  // JSONB: string or array (vision)
      });
    }
  }

  // Forward to Anthropic
  let upstream;
  try {
    upstream = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(anthropicBody),
    });
  } catch (e) {
    return jsonError(`Upstream fetch failed: ${e.message || e}`, 502);
  }

  // Bubble up non-200 upstream errors as JSON so the client can show them
  if (!upstream.ok) {
    const errText = await upstream.text();
    return new Response(errText, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/json',
        ...CORS_HEADERS,
      },
    });
  }

  // ─── Stream tee: pipe SSE to client + accumulate assistant text ──
  // Phase B: we capture the assistant's full response as text chunks
  // stream past, then persist to Supabase after the stream completes.
  // The client doesn't notice — it gets the same SSE format it always did.
  const shouldPersistAssistant = SUPABASE_ENABLED && resolvedConversationId;

  let pipedStream = upstream.body;

  if (shouldPersistAssistant) {
    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let accumulated = '';

    pipedStream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);  // pass through to client

            // Tee: extract text deltas for persistence
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            for (const line of lines) {
              const l = line.trim();
              if (!l.startsWith('data:')) continue;
              const payload = l.slice(5).trim();
              if (!payload || payload === '[DONE]') continue;
              try {
                const evt = JSON.parse(payload);
                if (evt.type === 'content_block_delta' && evt.delta && evt.delta.type === 'text_delta') {
                  accumulated += evt.delta.text;
                }
              } catch (e) { /* swallow partial frames */ }
            }
          }
        } finally {
          controller.close();

          // Persist assistant response + update conversation timestamp.
          // Fire-and-forget; don't await — the client has already received
          // the stream by this point.
          if (accumulated) {
            supabaseInsert('messages', {
              conversation_id: resolvedConversationId,
              role: 'assistant',
              content: accumulated,
            });
            supabasePatch('conversations', resolvedConversationId, {
              last_message_at: new Date().toISOString(),
            });
          }
        }
      }
    });
  }

  // Return the stream + send conversationId back via header so the client
  // can stash it for subsequent turns. CORS expose-headers list allows it
  // through the browser's same-origin filter.
  return new Response(pipedStream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Conversation-Id': resolvedConversationId || '',
      ...CORS_HEADERS,
    },
  });
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}
