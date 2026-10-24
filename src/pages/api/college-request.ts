/* ============================================================================
   CGPA Calculator AI — request your college endpoint
   ============================================================================
   Cloudflare Workers function. Receives a request to add a new university.
   Stores nothing personal beyond what the user voluntarily submits.
   ============================================================================ */

export interface RequestBody {
  collegeName: string;
  university: string;
  country: string;
  website?: string;
  scheme?: string;
  email?: string;
  notes?: string;
}

export async function onRequestPost(context: {
  request: Request;
  env: Record<string, unknown>;
}) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let body: RequestBody;
  try {
    body = (await context.request.json()) as RequestBody;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Validation
  const errors: string[] = [];
  if (!body.collegeName || body.collegeName.trim().length < 2) errors.push('collegeName');
  if (!body.university || body.university.trim().length < 2) errors.push('university');
  if (!body.country || body.country.trim().length < 2) errors.push('country');
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('email');

  if (errors.length > 0) {
    return new Response(
      JSON.stringify({ error: 'Validation failed', fields: errors }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  // In production, forward to a form service / email. Here we just acknowledge.
  // No personal data is logged beyond the submission itself.
  console.log('College request received:', {
    collegeName: body.collegeName,
    university: body.university,
    country: body.country,
    scheme: body.scheme,
  });

  return new Response(
    JSON.stringify({
      ok: true,
      message: 'Thank you! Your college request has been received. We prioritize verified universities.',
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
}
