# FixGo

Aplicație React (Vite) ce simulează o platformă care conectează clienți cu meseriași
din România — instalatori, electricieni, zugravi și alții — cu un mod separat pentru
meseriași (Solicitări, Calendar, Angajați, Abonamente).

## Pornire rapidă

```bash
npm install
npm run dev
```

Deschide link-ul afișat în terminal (implicit `http://localhost:5173/`).

La prima rulare vei vedea un ecran de autentificare — creează-ți un cont (stocat doar
în acest browser, vezi [Autentificare și date](#autentificare-și-date) mai jos).

## Scripturi disponibile

| Comandă           | Ce face                                              |
|-------------------|-------------------------------------------------------|
| `npm run dev`     | Pornește serverul de dezvoltare (hot-reload)          |
| `npm run build`   | Build de producție, în `dist/`                        |
| `npm run preview` | Servește local build-ul de producție, ca test         |
| `npm run lint`    | Verifică stilul/erorile de cod (ESLint)                |
| `npm run format`  | Reformatează codul (Prettier)                          |
| `npm test`        | Rulează testele automate (Vitest)                      |

## Structura proiectului

```
src/
  components/   componente reutilizabile (Avatar, Rating, BottomNav, ...)
  pages/        cele ~40 de ecrane ale aplicației (Home, Chat, ProDashboard, ...)
  data/         date mock (categorii, meseriași, joburi ...)
  styles/       token-uri de design (culori, gradient, font)
  utils/        funcții ajutătoare, persistență (localStorage), autentificare
  routes.js     harta ecran ↔ URL (vezi mai jos)
  App.jsx       componenta principală: rutare + toată logica de stare
worker/         Cloudflare Worker care ascunde cheia API Anthropic (vezi mai jos)
```

## Rutare

Navigarea folosește [react-router](https://reactrouter.com) (`HashRouter`, deci URL-uri
de forma `#/worker/3`) — funcționează back/forward din browser, refresh pe orice ecran,
și link-uri directe. Fiecare pagină apelează în continuare `push('ecran', {...})` exact
ca înainte; `src/routes.js` face traducerea spre URL-uri reale, fără să fi fost nevoie
să ating vreuna din cele ~40 de pagini.

## Autentificare și date

Contul e creat și stocat **doar în acest browser** (localStorage, parola e hash-uită
SHA-256, nu în clar) — nu există server/bază de date reală în spate. Asta înseamnă:
- Datele (joburi, mesaje, recenzii, profil) supraviețuiesc unui refresh de pagină.
- Deschizând site-ul pe alt calculator/browser, pornești fără cont și fără date — nimic
  nu e sincronizat între dispozitive.

Pentru conturi reale, multi-dispozitiv, ar fi nevoie de un backend + bază de date
(de ex. Supabase sau Firebase) — o extindere separată, nefăcută aici.

## Funcțiile AI (Estimator, Ajutor, extragere facturi)

Aceste 3 funcții au nevoie de o cheie API Anthropic ca să funcționeze. Cheia **nu e
niciodată în codul aplicației** — vezi [`worker/README.md`](worker/README.md) pentru
pașii de configurare a proxy-ului (Cloudflare Worker, gratuit) care ține cheia ascunsă.
Fără el configurat, aceste ecrane arată un mesaj clar de eroare, nu una încearcă-și-eșuează
silențioasă.

## Deploy pe GitHub Pages

Push pe `main` declanșează automat `.github/workflows/deploy.yml`. Pasul de activare
inițială a GitHub Pages (Settings → Pages → Source: GitHub Actions) e manual, o singură
dată.

## Rulare locală cu Live Server (VS Code)

`npm run dev` e recomandat pentru lucru zilnic (hot-reload instant). Dacă vrei totuși să
folosești extensia Live Server: rulează `npm run build`, apoi deschide `dist/index.html`
cu Live Server — calea de bază e relativă, deci funcționează atât acolo cât și pe GitHub
Pages. Live Server nu poate rula direct fișierele din `src/` (JSX brut, fără build).

## Probleme cunoscute

- `npm audit` semnalează o vulnerabilitate moderată în `esbuild` (afectează doar
  serverul de dezvoltare local, nu build-ul de producție) și una în `react-router`
  specifică modului RSC/server — neutilizat aici (aplicația e 100% client-side).
- Aplicația nu are un backend real; toate „bazele de date" sunt date mock + localStorage.

## Licență

MIT — vezi [`LICENSE`](LICENSE).
