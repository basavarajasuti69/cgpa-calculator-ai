export const prerender = false;

import {
  rateLimit,
  validateAiInput,
  sanitizeText,
  groqChat,
  fallback,
  aiGuidanceNote,
} from '../../../lib/ai.ts';
import { targetSgpaNeeded } from '../../../lib/calculations.ts';

const PARSE_SYSTEM = `You parse a student's CGPA/SGPA question into a structured intent.
Return ONLY a JSON object with these fields:
- current: array of {semester: number, sgpa: number} for semesters already completed
- targetCgpa: number (the overall CGPA the user wants)
- remainingSemesters: number (semesters left to reach the target)
- creditsSoFar: number (optional, total credits completed)
- creditsRemaining: number (optional, total credits remaining)
- questionType: "target_sgpa" | "cgpa_from_sgpas" | "other"

If the request is not about CGPA/SGPA planning, set questionType to "other".
Use null for missing values. Do not explain. Output valid JSON only.`;

export async function onRequestOptions(context: { request: Request }) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  return new Response(null, { status: 204, headers: cors });
}

async function safeJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

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
    return new Response(JSON.stringify({ error: 'rate_limited', message: fallback('ask'), retryAfter: limit.retryAfter }), {
      status: 429,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const check = validateAiInput(await safeJson(context.request), ['question']);
  if (!check.ok) {
    return new Response(JSON.stringify({ error: check.error.code, message: check.error.message }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const question = sanitizeText(check.data.question as string);

  const parsed = await groqChat([
    { role: 'system', content: PARSE_SYSTEM },
    { role: 'user', content: question },
  ], { temperature: 0.2, json: true });

  if (!parsed.ok) {
    return new Response(JSON.stringify({ error: parsed.error.code, message: fallback('ask'), guidance: aiGuidanceNote('ask'), retryAfter: parsed.error.retryAfter }), {
      status: parsed.error.code === 'rate_limited' ? 429 : 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  let intent: any;
  try {
    intent = JSON.parse(parsed.text);
  } catch {
    return new Response(JSON.stringify({ error: 'bad_response', message: fallback('ask') }), {
      status: 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  if (intent.questionType !== 'target_sgpa') {
    return new Response(JSON.stringify({ error: 'unsupported', message: fallback('ask') }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const current = Array.isArray(intent.current) ? intent.current : [];
  const targetCgpa = typeof intent.targetCgpa === 'number' ? intent.targetCgpa : null;
  const remainingSemesters = typeof intent.remainingSemesters === 'number' ? intent.remainingSemesters : null;
  const creditsSoFar = typeof intent.creditsSoFar === 'number' ? intent.creditsSoFar : undefined;
  const creditsRemaining = typeof intent.creditsRemaining === 'number' ? intent.creditsRemaining : undefined;

  if (targetCgpa == null || remainingSemesters == null || remainingSemesters <= 0) {
    return new Response(JSON.stringify({ error: 'missing_fields', message: fallback('ask') }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  // Compute current credits and credit points from current SGPA if not provided
  // Fallback: assume equal credits per semester if credits not given (best effort)
  let currentCredits = creditsSoFar ?? 0;
  let currentCreditPoints = 0;
  if (creditsSoFar == null || creditsRemaining == null) {
    // rough estimate: sum sgpa * assumed credits if unknown? better to use simple approach
    // try to compute by assuming creditsSoFar/remaining if provided, else compute from current array
    // fallback: if only sgpa given, can't know credits - use a reasonable default
    const assumedCreditsPerSem = 20;
    if (creditsSoFar == null) {
      currentCredits = current.reduce((sum: number, c: any) => sum + assumedCreditsPerSem, 0);
    }
    if (creditsRemaining == null) {
      // can't know, but pass remainingSemesters for calculation differently? Our function expects remainingCredits
      // use assumed
    }
    for (const c of current) {
      currentCreditPoints += (c.sgpa || 0) * assumedCreditsPerSem;
    }
  }

  const plan = targetSgpaNeeded({
    currentCredits,
    currentCreditPoints,
    remainingCredits: creditsRemaining ?? (remainingSemesters * 20),
    targetCgpa,
  });

  if (!plan.possible || plan.neededSgpa > 10 || plan.neededSgpa < 0) {
    return new Response(JSON.stringify({ error: 'not_possible', message: fallback('ask') }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    answer: `You need an average SGPA of ${plan.neededSgpa.toFixed(2)} across your remaining ${remainingSemesters} semester(s) to reach a target CGPA of ${targetCgpa.toFixed(2)}.`,
    sgpaNeeded: plan.neededSgpa,
    targetCgpa,
    remainingSemesters,
    current,
    guidance: aiGuidanceNote('ask'),
  }), {
    status: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}
