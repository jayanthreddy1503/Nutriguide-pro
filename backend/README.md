# NutriGuide Pro — Backend (API)

Express + MongoDB API for the NutriGuide Pro app. This folder is deployable
on its own to any Node host (Render, Railway, Fly.io, Heroku, a VPS, etc).
It serves **no HTML** — it's a pure JSON API. Pair it with the `frontend`
folder deployed separately as a static site.

## 1. Install

```bash
npm install
```

## 2. Configure environment variables

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

| Variable | Purpose |
|---|---|
| `PORT` | Port the server listens on (most hosts set this for you) |
| `NODE_ENV` | Set to `production` when deployed — enables secure/cross-site cookies |
| `CLIENT_URL` | Your deployed **frontend** origin(s), comma-separated, no trailing slash — required for CORS + cookies to work |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random string — generate with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `RESEND_API_KEY` / `EMAIL_FROM` | For OTP verification emails (via Resend) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `GOOGLE_CALLBACK_URL` | Google OAuth login |
| `ANTHROPIC_API_KEY` | Optional — powers the AI food identifier feature |

⚠️ **Security note:** the `.env` that came with the original project contained
real, live credentials (a MongoDB Atlas username/password and a Google OAuth
client secret). Rotate both before deploying anywhere public — regenerate the
Atlas database user's password and regenerate the Google OAuth client secret
in Google Cloud Console.

See `AUTH_SETUP.md` for the full walkthrough of setting up Google OAuth and
Resend from scratch.

## 3. Run locally

```bash
npm run dev     # nodemon, auto-restarts on changes
# or
npm start
```

Server runs on `http://localhost:3000` by default (`/api/...` routes).

## 4. Deploy (example: Render)

1. Push this `backend` folder to its own GitHub repo (or a subfolder — Render
   lets you set a "Root Directory").
2. Render → New → Web Service → connect the repo.
3. Build command: `npm install`. Start command: `npm start`.
4. Add all the environment variables from step 2 in Render's dashboard.
5. Once deployed, set `GOOGLE_CALLBACK_URL` to
   `https://<your-render-domain>/api/auth/google/callback` and register that
   same URL as an Authorized redirect URI in Google Cloud Console.
6. Set `CLIENT_URL` to your deployed frontend's URL (e.g. your Netlify/Vercel
   domain) once you have it.

Railway, Fly.io, and a plain VPS follow the same shape: install deps, set env
vars, run `npm start`, point `GOOGLE_CALLBACK_URL` and `CLIENT_URL` at the
real deployed domains.

## Notes

- CORS is locked to whatever origins are listed in `CLIENT_URL` — update it
  any time you add a new frontend domain (e.g. a staging URL).
- Auth uses an `httpOnly` JWT cookie, not `localStorage`, so `NODE_ENV`,
  `CLIENT_URL`, and HTTPS all need to be correct in production or login will
  silently fail (cookie gets dropped by the browser). See `AUTH_SETUP.md`
  section 6 for the full explanation.
