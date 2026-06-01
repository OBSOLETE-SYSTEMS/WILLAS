// ─────────────────────────────────────────────────────────────────────────
// /api/strategist.js — Vercel Edge Function
//
// Streaming proxy for the in-app Strategist + brief-riff chat. Runs on
// GEMINI 2.5 FLASH (Alex 2026-05-31 — all Willa's API functions use the single
// GEMINI_API_KEY in Vercel). Gemini's SSE is TRANSLATED into the Anthropic-style
// {content_block_delta / text_delta} events the client (`streamStrategist`)
// already parses — so the front-end needs zero changes. Supabase conversation
// memory (Phase B) is preserved.
//
// thinkingBudget:0 keeps Flash fast for chat (per Willa's Gemini gotchas);
// without it Flash stalls. google_search grounding gives the Strategist live
// web answers on top of the injected week context.
// ─────────────────────────────────────────────────────────────────────────

export const config = { runtime: 'edge' };

const GEMINI_MODEL = 'gemini-2.5-flash';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Expose-Headers': 'X-Conversation-Id',
  'Access-Control-Max-Age': '86400',
};

function geminiKey() {
  return process.env.GEMINI_API_KEY
      || process.env.GOOGLE_API_KEY
      || process.env.GOOGLE_GENERATIVE_AI_API_KEY
      || process.env.GOOGLE_GENAI_API_KEY;
}

// ─── Supabase persistence helpers (unchanged) ──────────────────
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
    if (!res.ok) { console.error(`Supabase insert ${table} failed:`, res.status, await res.text()); return null; }
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (e) { console.error(`Supabase insert ${table} threw:`, e); return null; }
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
  } catch (e) { console.error(`Supabase patch ${table} threw:`, e); }
}

// Map the client's message content (string, or Anthropic-style content blocks
// incl. vision) into Gemini `parts`.
function toParts(content) {
  if (typeof content === 'string') return [{ text: content }];
  if (Array.isArray(content)) {
    return content.map(c => {
      if (!c) return null;
      if (c.type === 'text' && c.text) return { text: c.text };
      if (c.type === 'image' && c.source && c.source.data) {
        return { inline_data: { mime_type: c.source.media_type || 'image/jpeg', data: c.source.data } };
      }
      return null;
    }).filter(Boolean);
  }
  return [{ text: String(content || '') }];
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (req.method !== 'POST') return jsonError('Method not allowed. POST only.', 405);

  const KEY = geminiKey();
  if (!KEY) return jsonError('Server misconfigured — no Gemini API key (set GEMINI_API_KEY in Vercel).', 500);

  let body;
  try { body = await req.json(); } catch (e) { return jsonError('Invalid JSON in request body.', 400); }

  const {
    messages,
    systemExtras,
    maxTokens = 2000,
    enableWebSearch = true,
    clientId = 'willas',
    agentType,
    contextId,
    userLabel,
    conversationId,
  } = body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonError('`messages` must be a non-empty array of role/content turns.', 400);
  }

  // System blocks (strings or {type:text,text}) → one Gemini systemInstruction.
  const sysText = [];
  if (Array.isArray(systemExtras)) {
    for (const block of systemExtras) {
      if (typeof block === 'string' && block.trim()) sysText.push(block);
      else if (block && block.type === 'text' && block.text) sysText.push(block.text);
    }
  }

  // Messages → Gemini contents (assistant → model).
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: toParts(m.content),
  }));

  const geminiBody = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: maxTokens,
      thinkingConfig: { thinkingBudget: 0 }, // chat speed — Flash stalls without this
    },
  };
  if (sysText.length) geminiBody.systemInstruction = { parts: [{ text: sysText.join('\n\n') }] };
  if (enableWebSearch) geminiBody.tools = [{ google_search: {} }];

  // ─── Supabase: resolve/create conversation + persist user turn ──
  let resolvedConversationId = conversationId || null;
  if (SUPABASE_ENABLED && agentType) {
    if (!resolvedConversationId) {
      const conv = await supabaseInsert('conversations', {
        client_id: clientId, agent_type: agentType, context_id: contextId || null, user_label: userLabel || null,
      });
      if (conv && conv.id) resolvedConversationId = conv.id;
    }
    const lastMsg = messages[messages.length - 1];
    if (resolvedConversationId && lastMsg && lastMsg.role === 'user') {
      supabaseInsert('messages', { conversation_id: resolvedConversationId, role: 'user', content: lastMsg.content });
    }
  }

  // Forward to Gemini (streaming SSE).
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${KEY}`;
  let upstream;
  try {
    upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody),
    });
  } catch (e) {
    return jsonError(`Upstream fetch failed: ${e.message || e}`, 502);
  }

  if (!upstream.ok) {
    const errText = await upstream.text();
    return new Response(errText, {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json', ...CORS_HEADERS },
    });
  }

  // ─── Translate Gemini SSE → Anthropic-style SSE the client parses ──
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';
  let accumulated = '';

  const out = new ReadableStream({
    async start(controller) {
      const emit = (text) => {
        accumulated += text;
        controller.enqueue(encoder.encode(
          'data: ' + JSON.stringify({ type: 'content_block_delta', delta: { type: 'text_delta', text } }) + '\n\n'
        ));
      };
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
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
              const parts = (((evt.candidates || [])[0] || {}).content || {}).parts || [];
              for (const p of parts) { if (p && p.text) emit(p.text); }
            } catch (e) { /* swallow partial frames */ }
          }
        }
      } finally {
        controller.close();
        if (SUPABASE_ENABLED && resolvedConversationId && accumulated) {
          supabaseInsert('messages', { conversation_id: resolvedConversationId, role: 'assistant', content: accumulated });
          supabasePatch('conversations', resolvedConversationId, { last_message_at: new Date().toISOString() });
        }
      }
    },
  });

  return new Response(out, {
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
