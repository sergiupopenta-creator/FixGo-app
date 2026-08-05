/**
 * Cloudflare Worker: proxies FixGo's 3 AI features (Estimator, Ajutor,
 * extragere materiale din factură) to Anthropic, so the real API key never
 * ships in the front-end JS bundle. Deploy this once (see README.md in this
 * folder), then set VITE_AI_PROXY_URL in the FixGo app to this worker's URL.
 *
 * Required secret (set via `wrangler secret put ANTHROPIC_API_KEY`):
 *   ANTHROPIC_API_KEY — your real Anthropic API key.
 *
 * Optional var (set in wrangler.toml or the dashboard):
 *   ALLOWED_ORIGIN — the exact origin allowed to call this worker from a
 *   browser, e.g. https://<user>.github.io. Defaults to "*" (any origin)
 *   if unset — tighten this once you know your GitHub Pages URL.
 */

const MAX_TOKENS_CEILING = 2000;

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    const headers = corsHeaders(env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers });
    }

    if (!env.ANTHROPIC_API_KEY) {
      return new Response('Server misconfigured: ANTHROPIC_API_KEY not set', { status: 500, headers });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Invalid JSON body', { status: 400, headers });
    }

    const upstreamBody = {
      model: body.model || 'claude-sonnet-4-6',
      max_tokens: Math.min(Number(body.max_tokens) || 1000, MAX_TOKENS_CEILING),
      messages: body.messages,
    };

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(upstreamBody),
    });

    const responseBody = await upstream.text();
    return new Response(responseBody, {
      status: upstream.status,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  },
};
