/* ============================================================================
   CGPA Calculator AI — Study planner endpoint
   ============================================================================
   Given current grades, target CGPA and weak subjects, produce a realistic
   semester-wise plan. Guidance only — never overrides calculator output.
   ============================================================================ */

import {
  rateLimit,
  validateAiInput,
  sanitizeText,
  groqChat,
  fallback,
  aiGuidanceNote,
} from '../../../lib/ai.ts';

const PLAN_SYSTEM = `You create a realistic, semester-wise study improvement plan.
Inputs: current CGPA, target CGPA, weak subjects, remaining semesters.
Output JSON: { plan: string[], prioritySubjects: string[], revaluationWorthIt: boolean, note: string }.
Be practical and encouraging. Label as guidance, not official advice.`; 

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
    return new Response(JSON.stringify({ error: 'rate_limited', message: fallback('plan'), retryAfter: limit.retryAfter }), {
      status: 429,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const check = validateAiInput(await safeJson(context.request), ['currentCgpa', 'targetCgpa']);
  if (!check.ok) {
    return new Response(JSON.stringify({ error: check.error.code, message: check.error.message }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const currentCgpa = Number(check.data.currentCgpa);
  const targetCgpa = Number(check.data.targetCgpa);
  const weakSubjects = Array.isArray(check.data.weakSubjects) ? check.data.weakSubjects.join(', ') : 'none specified';
  const remaining = Number(check.data.remainingSemesters ?? 1);

  const parsed = await groqChat([
    { role: 'system', content: PLAN_SYSTEM },
    { role: 'user', content: `Current CGPA: ${currentCgpa}. Target CGPA: ${targetCgpa}. Remaining semesters: ${remaining}. Weak subjects: ${weakSubjects}.` },
  ], { temperature: 0.4 });

  if (!parsed.ok) {
    return new Response(JSON.stringify({ error: parsed.error.code, message: fallback('plan'), guidance: aiGuidanceNote('plan'), retryAfter: parsed.error.retryAfter }), {
      status: parsed.error.code === 'rate_limited' ? 429 : 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  let plan: any;
  try {
    plan = JSON.parse(parsed.text);
  } catch {
    plan = {
      plan: [`Aim for ${targetCgpa.toFixed(2)} CGPA by focusing on upcoming semesters`, `Prioritize weak subjects: ${weakSubjects}`, `Use the calculator to track each semester`],
      prioritySubjects: weakSubjects ? [weakSubjects] : [],
      revaluationWorthIt: false,
      note: 'AI-generated plan — verify with your academic advisor.',
    };
  }

  return new Response(JSON.stringify({
    ok: true,
    currentCgpa,
    targetCgpa,
    plan,
    guidance: aiGuidanceNote('plan'),
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
