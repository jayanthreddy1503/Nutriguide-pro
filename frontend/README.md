# NutriGuide Pro — Frontend

Static HTML/CSS/JS frontend for NutriGuide Pro. No build step — deploy the
folder as-is to any static host (Netlify, Vercel, GitHub Pages, Cloudflare
Pages, S3, etc). It talks to the backend API over `fetch`, so the backend
must be deployed separately (see `../backend`).

## 1. Point it at your backend

Open `js/config.js`:

```js
const BACKEND_URL = '';
```

- **Local dev / same-origin deployment** (frontend and backend served from
  the same domain): leave this empty. Requests go to `/api` on whatever
  origin the page is loaded from.
- **Split deployment** (frontend and backend on different domains, e.g.
  frontend on Netlify + backend on Render): set it to your backend's full
  URL, no trailing slash:
  ```js
  const BACKEND_URL = 'https://nutriguide-api.onrender.com';
  ```

This is the **only** file you need to edit — every page and the "Continue
with Google" button pick it up automatically.

## 2. Run locally

Any static server works, e.g.:

```bash
npx serve .
# or
python3 -m http.server 5500
```

Then open `http://localhost:<port>/login.html` (or `index.html`).

## 3. Deploy (example: Netlify)

1. Push this `frontend` folder to its own GitHub repo (or set it as the
   "Base directory" / "Publish directory" if it's a subfolder of a monorepo).
2. Netlify → Add new site → import from Git.
3. Build command: (none). Publish directory: `.` (this folder's root).
4. Deploy. Copy the resulting URL (e.g. `https://nutriguide.netlify.app`).
5. Set that URL as `BACKEND_URL`... no wait — set it as the backend's
   `CLIENT_URL` env var (see `../backend/README.md`), and set **this**
   folder's `js/config.js` `BACKEND_URL` to your backend's deployed URL.
   Redeploy the frontend after editing `config.js`.

Vercel, GitHub Pages, and Cloudflare Pages work the same way — no build
step, just point the host at this folder.

## Notes

- Every page except `feature-info.html` and `index.html` (which don't hit
  the API) loads `js/config.js` before `js/api.js`.
- Login relies on an `httpOnly` cookie set by the backend. For it to work
  cross-domain, the backend needs `NODE_ENV=production` and both frontend
  and backend must be served over HTTPS — see `../backend/AUTH_SETUP.md`
  section 6 for details.
