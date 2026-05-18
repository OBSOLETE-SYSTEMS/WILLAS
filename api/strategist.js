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
// ─────────────────────────────────────────────────────────────────────────

export const config = { runtime: 'edge' };

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

// CORS — same-origin in production (engine + proxy share the willas domain),
// but development can run index.html from a file:// or localhost origin.
// Allowing all origins is fine because the proxy only accepts POST + the
// API key never leaves the server. No credentials cookie surface.
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

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

  // Pipe the SSE stream straight back. Anthropic's stream is already in
  // the SSE format the browser parses today — no transformation needed.
  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
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
