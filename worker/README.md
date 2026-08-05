# Proxy AI (Cloudflare Worker)

Cele 3 funcții AI din aplicație (AI Estimator, Ajutor/chatbot, extragere materiale din
factură) au nevoie de o cheie API Anthropic ca să funcționeze. Cheia **nu trebuie pusă
niciodată direct în codul aplicației** — orice cheie scrisă în React ajunge vizibilă în
bundle-ul JS livrat browserului, deci vizibilă oricui.

Acest folder conține un mic server (Cloudflare Worker) care ține cheia ascunsă, găzduit
gratuit. Aplicația React vorbește cu acest worker, nu direct cu Anthropic.

## Pași de instalare (o singură dată, ~10 minute)

1. **Cont Cloudflare** (gratuit): [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

2. **Instalează Wrangler** (CLI-ul Cloudflare), din orice terminal:
   ```bash
   npm install -g wrangler
   wrangler login
   ```
   (se deschide browserul, autorizezi contul)

3. **Din acest folder** (`worker/`), publică worker-ul:
   ```bash
   cd worker
   wrangler deploy
   ```
   La final, Wrangler afișează un URL de genul:
   ```
   https://fixgo-ai-proxy.<contul-tau>.workers.dev
   ```
   Copiază acest URL — ai nevoie de el la pasul 5.

4. **Adaugă cheia Anthropic ca secret** (nu ajunge niciodată în cod sau în git):
   ```bash
   wrangler secret put ANTHROPIC_API_KEY
   ```
   Te va întreba valoarea — lipește cheia ta de pe [console.anthropic.com](https://console.anthropic.com/settings/keys).

5. **Configurează aplicația FixGo** să folosească acest worker: în rădăcina proiectului
   (nu în `worker/`), creează un fișier `.env` (vezi `.env.example`) cu:
   ```
   VITE_AI_PROXY_URL=https://fixgo-ai-proxy.<contul-tau>.workers.dev
   ```
   Apoi rebuild: `npm run build` (sau repornește `npm run dev`).

   Dacă folosești deploy automat pe GitHub Pages (workflow-ul din `.github/workflows/`),
   adaugă `VITE_AI_PROXY_URL` ca **secret** în Settings → Secrets and variables → Actions
   al repo-ului, și `env: VITE_AI_PROXY_URL: ${{ secrets.VITE_AI_PROXY_URL }}` la pasul de
   build din workflow.

## Restrânge accesul (recomandat)

După ce știi URL-ul exact al site-ului tău de pe GitHub Pages, editează `wrangler.toml`:
```toml
[vars]
ALLOWED_ORIGIN = "https://<user-ul-tau>.github.io"
```
și rulează din nou `wrangler deploy`. Asta blochează apelurile din browser venite de pe
alte site-uri (deși nu împiedică pe cineva să apeleze worker-ul direct, cu curl — pentru
protecție reală împotriva abuzului/costurilor, activează **Rate Limiting** (gratuit până
la un prag) din Cloudflare Dashboard → Security → WAF, pe subdomeniul worker-ului).

## Testare rapidă

```bash
curl -X POST https://fixgo-ai-proxy.<contul-tau>.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Salut!"}],"max_tokens":50}'
```
Dacă primești un răspuns JSON cu text generat, totul e configurat corect.
