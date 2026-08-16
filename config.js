// ─────────────────────────────────────────────────────────────────────────
// Backend API URL — the ONE thing you need to edit when deploying the
// frontend and backend separately (e.g. frontend on Netlify/Vercel/GitHub
// Pages, backend on Render/Railway/Fly).
//
// Leave this EMPTY ('') for local dev / same-origin deployment (frontend
// and backend served from the same domain) — requests will just go to
// "/api" on whatever origin the page is loaded from.
//
// For a split deployment, set this to your deployed backend's full origin,
// no trailing slash, e.g.:
//   const BACKEND_URL = 'https://nutriguide-api.onrender.com';
//
// LEFT EMPTY: this project now uses a Vercel rewrite (see vercel.json) to
// silently proxy /api/* calls to the Render backend, so from the browser's
// point of view everything is same-origin. This fixes cross-site cookies
// being blocked (Google login and staying-logged-in were both broken by
// this before). Do NOT set this back to the onrender.com URL — that would
// make requests cross-site again and bring the cookie bug back.
// ─────────────────────────────────────────────────────────────────────────
const BACKEND_URL = '';
