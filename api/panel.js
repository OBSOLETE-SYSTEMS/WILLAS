// ─────────────────────────────────────────────────────────────────────────
// /api/panel.js — Vercel Edge Function
// The Synthetic Panel — "The Tasting Table"
//
// Pressure-tests a single content brief against 4 synthetic Willa's customers,
// each calibrated to a different layer of the real audience. Returns a 1-10
// score, a reaction quote, and an optional edit suggestion per persona, plus a
// one-line headline insight.
//
// Model: Gemini 2.5 Flash — same key as the Strategist (per Alex 2026-05-31).
// Uses JSON mode (responseMimeType) + thinkingBudget:0 + a generous
// maxOutputTokens so the JSON never truncates mid-string (Willa's Gemini
// gotchas). Non-streaming: we want one clean JSON object.
// ─────────────────────────────────────────────────────────────────────────

export const config = { runtime: 'edge' };

const GEMINI_MODEL = 'gemini-2.5-flash';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

// Read whichever Gemini key the Strategist uses in Vercel.
function geminiKey() {
  return process.env.GEMINI_API_KEY
      || process.env.GOOGLE_API_KEY
      || process.env.GOOGLE_GENERATIVE_AI_API_KEY
      || process.env.GOOGLE_GENAI_API_KEY;
}

// The panel calibration. Four readers tuned to Willa's real audience layers.
// Their consensus is the "Synthetic Panel" leg of every brief's conviction score.
const PANEL_SYSTEM = `You are THE TASTING TABLE — four synthetic customers calibrated against Willa's Oat Milk's real audience (clean-label, organic, mother-founded oat milk; pillars: health/wellness, ingredients/recipes, parenting, reviews/recs). You read one content brief and react AS each persona, honestly and in their own voice.

THE FOUR READERS:
1. Maya · 34 · Austin, TX — CLEAN-LABEL MOM. Reads every label, Yuka power-user, buys organic for her kids. CARES: ingredient transparency, the 4-ingredient panel, glyphosate-free + organic certs, no rapeseed/gums/dyes, allergen-free Kids, "what's NOT in it." SOFT ON: meme-chasing for its own sake, trade-press talk, marketing spin over substance.
2. Jordan · 39 · suburban Minneapolis — SHELF CONVERT. Found Willa's at Target/Sprouts, recently switched from almond milk. CARES: taste, froth, at-shelf proof, where-to-buy, honest before/after switch stories, value, does-it-work-in-coffee. SOFT ON: deep heritage/founder lore, insider category jargon, activist tone that assumes prior knowledge.
3. Devon · 28 · Brooklyn — CATEGORY-CURIOUS FOODIE. Follows Olipop, Graza, Fishwife, Omsom; brand-aware, design-led, very online. CARES: clever wordplay + peer-brand-caliber humor, viral recipe remixes, meme-payload formats that land, aesthetic/IRL beauty, a brand with a point of view. SOFT ON: earnest wellness-mom register, plain ingredient-checklist pins, anything that reads try-hard or off-trend.
4. Sam · 42 · Denver, working parent of 2 — KID-UTILITY PARENT. Cares about format and whether it makes weeknights easier, not about origin story. CARES: kids will actually drink it, protein/fiber, lunchbox + after-school use, fast recipes with a clear payoff, family-moment warmth. SOFT ON: category-fight/activist content, long heritage explainers, ambitious retail-milestone storytelling.

SCORING (1-10, honest — use the range; a brief that's wrong for a persona scores low FROM THAT PERSONA even if it's great for another):
9-10 = would stop scrolling, save it, maybe buy. 6-8 = solid, on-target. 3-5 = meh / not for them / executionally soft. 1-2 = actively off (wrong audience, off-voice, a miss).

VOICE GUARDRAILS for any suggested_edit: Willa's voice is warm, with-a-wink, assertive + activist, transparent, witty. Never name competitors. No diet-culture/restriction framing. No business metrics in consumer copy. Keep edits concrete and short.

Output a JSON object with EXACTLY this shape:
{"reactions":[{"persona":"Maya","score":<1-10 integer>,"reaction":"<1-2 sentence first-person reaction in this persona's voice>","suggested_edit":"<one concrete tweak, or null>"},{"persona":"Jordan",...},{"persona":"Devon",...},{"persona":"Sam",...}],"headline_insight":"<one line: what this brief lands and what it misses across the table>"}`;

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function briefToPrompt(b) {
  if (!b || typeof b !== 'object') return 'No brief provided.';
  const recHook = ((b.hooks || []).find(h => h && h.recommended) || (b.hooks || [])[0] || {}).text || '';
  const lines = [
    `CONCEPT: ${b.concept || ''}`,
    `PLATFORM · PILLAR · FLAVOR: ${b.platform || ''} · ${b.pillar || ''} · ${b.flavor || ''}`,
    `PRIORITY · FORMAT: ${b.priority || ''} · ${b.dnaPattern || '(none)'}`,
    `RECOMMENDED HOOK: "${recHook}"`,
  ];
  if (b.caption) lines.push(`CAPTION: ${String(b.caption).slice(0, 900)}`);
  if (b.visual) lines.push(`VISUAL: ${String(b.visual).slice(0, 500)}`);
  return lines.join('\n');
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (req.method !== 'POST') return jsonError('Method not allowed. POST only.', 405);

  const KEY = geminiKey();
  if (!KEY) return jsonError('Server misconfigured — no Gemini API key (set GEMINI_API_KEY in Vercel, same as the Strategist).', 500);

  let body;
  try { body = await req.json(); } catch (e) { return jsonError('Invalid JSON in request body.', 400); }
  const brief = body && body.brief;
  if (!brief) return jsonError('`brief` is required.', 400);

  const geminiBody = {
    systemInstruction: { parts: [{ text: PANEL_SYSTEM }] },
    contents: [{ role: 'user', parts: [{ text: `Read this brief and give me the table's reactions as JSON.\n\n${briefToPrompt(brief)}` }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.85,
      maxOutputTokens: 4096,           // generous so the JSON never truncates mid-string
      thinkingConfig: { thinkingBudget: 0 },  // CRITICAL: disables extended thinking — else Flash is slow + can truncate
    },
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${KEY}`;

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
    return new Response(errText, { status: upstream.status, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } });
  }

  let data;
  try { data = await upstream.json(); } catch (e) { return jsonError('Could not parse upstream response.', 502); }

  const text = ((((data.candidates || [])[0] || {}).content || {}).parts || [])
    .map(p => p && p.text ? p.text : '').join('');
  if (!text) return jsonError('Panel returned an empty response.', 502);

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    // Last-ditch: pull the outermost {...} in case anything wrapped it.
    try {
      const s = text.indexOf('{'), eIdx = text.lastIndexOf('}');
      parsed = JSON.parse(text.slice(s, eIdx + 1));
    } catch (e2) {
      return jsonError('Panel returned malformed JSON.', 502);
    }
  }

  return new Response(JSON.stringify(parsed), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...CORS_HEADERS },
  });
}
