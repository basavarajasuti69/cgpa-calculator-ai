/* ============================================================================
   CGPA Calculator AI — Explain AI endpoint
   ============================================================================
   Plain-English summary of a result + formula. AI does not calculate.
   ============================================================================ */

import {
  rateLimit,
  validateAiInput,
  sanitizeText,
  groqChat,
  fallback,
  aiGuidanceNote,
} from '../../../lib/ai.ts';

const EXPLAIN_SYSTEM = `You explain a student's SGPA/CGPA result in plain English.
Inputs: current SGPA/CGPA, credits, formula used. Output a short, encouraging summary
and restate the formula. Label output as guidance, not an official result.
Return JSON: { summary: string, formula: string, nextSteps: string[] }`;

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
    return new Response(JSON.stringify({ error: 'rate_limited', message: fallback('explain'), retryAfter: limit.retryAfter }), {
      status: 429,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const check = validateAiInput(await safeJson(context.request), ['cgpa', 'sgpa']);
  if (!check.ok) {
    return new Response(JSON.stringify({ error: check.error.code, message: check.error.message }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const cgpa = Number(check.data.cgpa);
  const sgpa = Number(check.data.sgpa);
  const totalCredits = Number(check.data.totalCredits ?? 0);

  const parsed = await groqChat([
    { role: 'system', content: EXPLAIN_SYSTEM },
    { role: 'user', content: `CGPA: ${cgpa}, latest SGPA: ${sgpa}, total credits: ${totalCredits}. Formula: SGPA = Σ(credits × grade point) ÷ Σ credits; CGPA = Σ(credit points) ÷ Σ(credits). Percentage (VTU) = CGPA × 9.5.` },
  ], { temperature: 0.4 });

  if (!parsed.ok) {
    return new Response(JSON.stringify({ error: parsed.error.code, message: fallback('explain'), guidance: aiGuidanceNote('explain'), retryAfter: parsed.error.retryAfter }), {
      status: parsed.error.code === 'rate_limited' ? 429 : 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  let explanation: any;
  try {
    explanation = JSON.parse(parsed.text);
  } catch {
    explanation = {
      summary: `Your CGPA is ${cgpa.toFixed(2)} and your latest SGPA is ${sgpa.toFixed(2)}.`,
      formula: 'SGPA = Σ(credits × grade point) ÷ Σ credits; CGPA = Σ(credit points) ÷ Σ(credits)',
      nextSteps: ['Focus on weak subjects', 'Consider revaluation for borderline F grades', 'Use the Target Planner to plan ahead'],
    };
  }

  return new Response(JSON.stringify({
    ok: true,
    cgpa,
    sgpa,
    totalCredits,
    explanation,
    guidance: aiGuidanceNote('explain'),
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
