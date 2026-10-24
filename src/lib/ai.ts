/* ============================================================================
   CGPA Calculator AI — shared AI module (server-side only)
   ============================================================================
   All LLM calls happen here. The Groq API key lives only in server env
   (Cloudflare secret GROQ_API_KEY). Client code never sees it.
   ============================================================================ */

const GROQ_API_KEY = typeof process !== 'undefined' && process.env.GROQ_API_KEY
  ? process.env.GROQ_API_KEY
  : '';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant'; // free tier, fast, supports vision via multimodal models if needed

export type AiProvider = 'groq';

export interface AiError {
  code: 'rate_limited' | 'invalid_input' | 'provider_unavailable' | 'fallback';
  message: string;
  retryAfter?: number;
}

/* ---------- simple in-memory rate limiter (per IP) ---------- */
const windowMs = 60 * 1000;
const maxRequests = 20;
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + windowMs });
    return { allowed: true };
  }
  if (entry.count >= maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }
  entry.count += 1;
  return { allowed: true };
}

/* ---------- input validation ---------- */
export function validateAiInput(body: unknown, required: string[]): { ok: true; data: Record<string, unknown> } | { ok: false; error: AiError } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: { code: 'invalid_input', message: 'Request body must be a JSON object.' } };
  }
  const data = body as Record<string, unknown>;
  for (const key of required) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      return { ok: false, error: { code: 'invalid_input', message: `Missing required field: ${key}` } };
    }
  }
  return { ok: true, data };
}

export function sanitizeText(input: string): string {
  return String(input).slice(0, 4000);
}

/* ---------- Groq chat completion ---------- */
export async function groqChat(messages: { role: string; content: string }[], opts: {
  temperature?: number;
  maxTokens?: number;
  json?: boolean;
} = {}): Promise<{ ok: true; text: string } | { ok: false; error: AiError }> {
  if (!GROQ_API_KEY) {
    return { ok: false, error: { code: 'provider_unavailable', message: 'AI provider not configured.' } };
  }

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: opts.temperature ?? 0.3,
        max_completion_tokens: opts.maxTokens ?? 512,
        ...(opts.json ? { response_format: { type: 'json_object' } } : {}),
      }),
    });

    if (res.status === 429) {
      const retryAfter = res.headers.get('retry-after');
      return { ok: false, error: { code: 'rate_limited', message: 'AI rate limit reached. Try again shortly.', retryAfter: retryAfter ? parseInt(retryAfter, 10) : 60 } };
    }
    if (!res.ok) {
      return { ok: false, error: { code: 'provider_unavailable', message: `AI provider error (${res.status}).` } };
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content ?? '';
    return { ok: true, text };
  } catch (err) {
    return { ok: false, error: { code: 'provider_unavailable', message: 'AI provider is unreachable.' } };
  }
}

/* ---------- fallback responses (AI unavailable) ---------- */
export function fallback(kind: string): string {
  const fallbacks: Record<string, string> = {
    scan: 'AI marks-card scanning is temporarily unavailable. Please enter your subjects and grades manually — the calculator works fully offline.',
    ask: 'AI assistant is temporarily unavailable. Use the calculator pages to compute SGPA/CGPA directly.',
    plan: 'Study planner is temporarily unavailable. Use the Target CGPA Planner to work out what you need.',
    explain: 'Result explanation is temporarily unavailable. The formula and breakdown are shown on the calculator page.',
    eligibility: 'Eligibility check is temporarily unavailable. Check placement/higher-studies cutoffs with your college.',
    faq: 'FAQ assistant is temporarily unavailable. See the Grading and Examples pages for verified VTU rules.',
  };
  return fallbacks[kind] ?? 'AI features are temporarily unavailable. The calculators still work offline.';
}

export function aiGuidanceNote(kind: string): string {
  return 'AI-generated guidance — not an official result. Always verify with your college and official VTU sources.';
}
