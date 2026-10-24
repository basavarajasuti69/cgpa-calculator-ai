export const prerender = false;

/* ============================================================================
   CGPA Calculator AI — Eligibility endpoint
   ============================================================================
   Typical cutoffs for placements / higher studies based on CGPA, with a
   disclaimer that criteria vary by institution.
   ============================================================================ */

import {
  rateLimit,
  validateAiInput,
  sanitizeText,
  groqChat,
  fallback,
  aiGuidanceNote,
} from '../../../lib/ai.ts';

const ELIG_SYSTEM = `Given a CGPA, list typical eligibility cutoffs for campus placements,
GATE, MBA, MS abroad, and WES-style conversion. Always include a disclaimer that
criteria vary by institution and this is guidance only. Return JSON:
{ cgpa, placements: string[], higherStudies: string[], wesConversion: string, disclaimer: string }`; 

export async function onRequestPost(context: {
  request: Request;
  env: Record<string, unknown>;
  clientAddress?: string | null;
}) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  const ip = context.clientAddress ?? 'unknown';
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return new Response(JSON.stringify({ error: 'rate_limited', message: fallback('eligibility'), retryAfter: limit.retryAfter }), {
      status: 429,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const check = validateAiInput(await safeJson(context.request), ['cgpa']);
  if (!check.ok) {
    return new Response(JSON.stringify({ error: check.error.code, message: check.error.message }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const cgpa = Number(check.data.cgpa);

  const parsed = await groqChat([
    { role: 'system', content: ELIG_SYSTEM },
    { role: 'user', content: `CGPA: ${cgpa}` },
  ], { temperature: 0.3 });

  if (!parsed.ok) {
    return new Response(JSON.stringify({ error: parsed.error.code, message: fallback('eligibility'), guidance: aiGuidanceNote('eligibility'), retryAfter: parsed.error.retryAfter }), {
      status: parsed.error.code === 'rate_limited' ? 429 : 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  let data: any;
  try {
    data = JSON.parse(parsed.text);
  } catch {
    data = {
      placements: ['Typical campus placement cutoff: 6.0–7.0 CGPA (varies by company)'],
      higherStudies: ['GATE: valid score + CGPA; MBA/MS: depends on university'],
      wesConversion: `Approximate 4.0 GPA: ${((cgpa / 10) * 4).toFixed(2)}`,
      disclaimer: 'Criteria vary by institution. Verify with the specific college/company.',
    };
  }

  return new Response(JSON.stringify({
    ok: true,
    cgpa,
    ...data,
    guidance: aiGuidanceNote('eligibility'),
  }), {
    status: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

async function safeJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}
