// Every AI feature (Estimator, Ajutor, extragere facturi) goes through this
// single function instead of calling api.anthropic.com directly from the
// browser. The Anthropic API key must never live in front-end code — anyone
// could open DevTools and read it out of the shipped JS bundle. Instead,
// VITE_AI_PROXY_URL points at a small server-side proxy (see /worker) that
// holds the real key as a secret and forwards the request.
//
// If VITE_AI_PROXY_URL isn't configured, we fail fast with a clear message
// instead of silently trying (and failing) to hit Anthropic with no key.
export async function callAI({ maxTokens, messages }) {
  const proxyUrl = import.meta.env.VITE_AI_PROXY_URL;
  if (!proxyUrl) {
    throw new Error('Funcția AI nu este configurată (lipsește VITE_AI_PROXY_URL). Vezi worker/README.md.');
  }

  const response = await fetch(proxyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Cerere eșuată (${response.status}) ${errText.slice(0, 150)}`);
  }

  const data = await response.json();
  return (data.content || []).map(b => b.text || '').join('');
}
