/* ============================================================================
   CGPA Calculator AI — FAQ endpoint (grounded in verified data only)
   ============================================================================
   Answers VTU grading questions using only our verified content. If unsure,
   says so and links the official VTU circular.
   ============================================================================ */

import {
  rateLimit,
  validateAiInput,
  sanitizeText,
  groqChat,
  fallback,
  aiGuidanceNote,
} from '../../../lib/ai.ts';

const FAQ_SYSTEM = `You answer VTU grading/SGPA/CGPA questions using ONLY this verified data:
- VTU 10-point scale: S=10, A=9, B=8, C=7, D=6, E=5, F=0, Absent=0
- SGPA = Σ(credits × grade point) ÷ Σ credits
- CGPA = Σ(credit points all semesters) ÷ Σ(credits all semesters)
- VTU Percentage = CGPA × 9.5
- CGPA → 4.0 GPA = CGPA ÷ 10 × 4
- Lateral entry skips semesters 1–2
If the answer is not in the above, say you're unsure and link https://vtu.ac.in/ .
Return JSON: { answer: string, source: string, unsure: boolean }`; 

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
    return new Response(JSON.stringify({ error: 'rate_limited', message: fallback('faq'), retryAfter: limit.retryAfter }), {
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
    { role: 'system', content: FAQ_SYSTEM },
    { role: 'user', content: question },
  ], { temperature: 0.2 });

  if (!parsed.ok) {
    return new Response(JSON.stringify({ error: parsed.error.code, message: fallback('faq'), guidance: aiGuidanceNote('faq'), retryAfter: parsed.error.retryAfter }), {
      status: parsed.error.code === 'rate_limited' ? 429 : 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  let data: any;
  try {
    data = JSON.parse(parsed.text);
  } catch {
    data = {
      answer: "I'm not sure about that. Please check the official VTU circular at https://vtu.ac.in/",
      source: 'https://vtu.ac.in/',
      unsure: true,
    };
  }

  return new Response(JSON.stringify({
    ok: true,
    question,
    ...data,
    guidance: aiGuidanceNote('faq'),
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
