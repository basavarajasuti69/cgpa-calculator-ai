/* ============================================================================
   CGPA Calculator AI — Marks card scanner endpoint
   ============================================================================
   User uploads a photo/PDF of their marks card. A vision model extracts
   subjects and grades. Images are processed in memory and NOT stored.
   Client confirms/edits before calculating.
   ============================================================================ */

import {
  rateLimit,
  fallback,
  aiGuidanceNote,
} from '../../../lib/ai.ts';

const VISION_MODEL = 'llama-3.2-11b-vision-preview';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SCAN_SYSTEM = `You extract subjects and grades from a student's marks card/result sheet.
Return ONLY a JSON object: { subjects: [{ code: string, name: string, grade: string | null, marks: number | null] }, confidence: number }.
Only include subjects you can clearly read. If unsure about a grade, set grade to null.
Do not invent subjects. Output valid JSON only.`; 

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
    return new Response(JSON.stringify({ error: 'rate_limited', message: fallback('scan'), retryAfter: limit.retryAfter }), {
      status: 429,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: 'provider_unavailable', message: fallback('scan'), guidance: aiGuidanceNote('scan') }), {
      status: 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  let formData: FormData;
  try {
    formData = await context.request.formData();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_input', message: 'Expected multipart form data with an image file.' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const file = formData.get('image');
  if (!(file instanceof File) || file.size === 0) {
    return new Response(JSON.stringify({ error: 'invalid_input', message: 'No image file provided.' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  // Validate file type
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/pdf', 'application/pdf'];
  if (!allowed.includes(file.type)) {
    return new Response(JSON.stringify({ error: 'invalid_input', message: 'Unsupported file type. Use JPEG, PNG, WEBP or PDF.' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  // Read file into memory (not stored to disk)
  const bytes = await file.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(bytes)));
  const dataUrl = `data:${file.type};base64,${base64}`;

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: VISION_MODEL,
        messages: [
          { role: 'system', content: SCAN_SYSTEM },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Extract the subjects and grades from this marks card.' },
              { type: 'image_url', image_url: { url: dataUrl } },
            ],
          },
        ],
        temperature: 0.2,
        max_completion_tokens: 512,
        response_format: { type: 'json_object' },
      }),
    });

    if (res.status === 429) {
      return new Response(JSON.stringify({ error: 'rate_limited', message: fallback('scan'), retryAfter: 60 }), {
        status: 429,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }
    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'provider_unavailable', message: fallback('scan') }), {
        status: 502,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    let extracted: any;
    try {
      extracted = JSON.parse(data.choices?.[0]?.message?.content ?? '{}');
    } catch {
      extracted = { subjects: [], confidence: 0 };
    }

    return new Response(JSON.stringify({
      ok: true,
      extracted,
      guidance: aiGuidanceNote('scan'),
      note: 'Review and confirm extracted subjects before calculating. Image not stored.',
    }), {
      status: 200,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'provider_unavailable', message: fallback('scan') }), {
      status: 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
}
