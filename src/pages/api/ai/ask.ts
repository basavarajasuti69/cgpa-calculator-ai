/* ============================================================================
   CGPA Calculator AI — Ask AI endpoint (plain-language assistant)
   ============================================================================
   The AI parses the user's request into a structured intent; the server then
   calls deterministic calculation functions. The AI never does arithmetic.
   ============================================================================ */

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

  // Ask the AI to parse intent (AI does NOT calculate)
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
    return new Response(JSON.stringify({ error: 'provider_unavailable', message: fallback('ask'), guidance: aiGuidanceNote('ask') }), {
      status: 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  // Deterministic calculation — AI never touches the numbers
  let result: any = { questionType: intent.questionType ?? 'other' };
  if (intent.questionType === 'target_sgpa' && intent.current && intent.targetCgpa != null && intent.remainingSemesters != null) {
    // estimate credits from SGPAs if not provided
    const currentCredits = intent.creditsSoFar ?? intent.current.reduce((sum: number, s: any) => sum + (s.semester * 20), 0);
    const currentPoints = intent.current.reduce((sum: number, s: any) => sum + (s.sgpa * (s.semester * 20)), 0);
    const plan = targetSgpaNeeded({
      currentCredits,
      currentCreditPoints: currentPoints,
      remainingCredits: intent.creditsRemaining ?? intent.remainingSemesters * 20,
      targetCgpa: intent.targetCgpa,
    });
    result = {
      ...result,
      plan,
      answer: plan.possible
        ? `You need an average SGPA of ${plan.neededSgpa.toFixed(2)} in your remaining semesters to reach ${plan.targetCgpa} CGPA.`
        : `That target isn't reachable — it would need an SGPA above 10.`,
      guidance: aiGuidanceNote('ask'),
    };
  } else if (intent.questionType === 'cgpa_from_sgpas' && intent.current) {
    let totCr = 0, totPts = 0;
    for (const s of intent.current) {
      const cr = s.semester * 20;
      totCr += cr;
      totPts += cr * s.sgpa;
    }
    result = {
      ...result,
      cgpa: totCr > 0 ? totPts / totCr : 0,
      totalCredits: totCr,
      guidance: aiGuidanceNote('ask'),
    };
  } else {
    result = { ...result, message: 'I can help with CGPA/SGPA planning. Try: "I scored 8.1 in sem 4 and 7.6 in sem 5, what do I need in sem 6 for 8.0 overall?"' };
  }

  return new Response(JSON.stringify({ ok: true, ...result }), {
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
