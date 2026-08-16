# NutriGuide Pro — Authentication System Setup

This document covers everything needed to configure and deploy the
email/password + OTP + Google OAuth authentication system.

## ⚠️ Rotate your existing credentials first

Your uploaded project's `.env` contained a **live MongoDB Atlas connection
string with a real username and password**, plus a placeholder `JWT_SECRET`
("mySuperSecretKey123"). Because that file was shared in this conversation:

1. **Rotate the MongoDB Atlas database user's password immediately**
   (Atlas → Database Access → edit user → Edit Password), or delete and
   recreate the user.
2. **Generate a new, random `JWT_SECRET`** — never reuse a short/guessable
   string. Generate one with:
   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```
3. The delivered project does **not** include a `.env` file — only
   `.env.example`. Create your own `.env` locally from that template and
   never commit it (a `.gitignore` is included).

## 1. Install dependencies

```bash
npm install
```

New packages added: `nodemailer`, `passport`, `passport-google-oauth20`,
`cookie-parser`.

## 2. Environment variables

Copy `.env.example` → `.env` and fill in every value. See inline comments
in that file for where each one comes from.

## 3. Resend (OTP emails)

1. Sign up at https://resend.com and verify a sending domain (or use their
   sandbox sender `onboarding@resend.dev` for local testing — it can only
   send to your own verified account email until you verify a domain).
2. Create an API key: **Resend Dashboard → API Keys → Create API Key**.
3. Set `RESEND_API_KEY` in `.env`. Nodemailer talks to Resend's SMTP relay
   (`smtp.resend.com:465`) using that key — see `utils/sendEmail.js`.
4. Set `EMAIL_FROM` to `"NutriGuide Pro <you@yourdomain.com>"` once your
   domain is verified.

## 4. Google Cloud Console (Google OAuth)

1. Go to https://console.cloud.google.com/ and create/select a project.
2. **APIs & Services → OAuth consent screen**:
   - User type: External (unless using Google Workspace internally).
   - Fill in app name, support email, developer contact.
   - Add scopes: `.../auth/userinfo.email`, `.../auth/userinfo.profile`.
   - Add your own account as a test user while the app is in "Testing" mode.
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - Application type: **Web application**.
   - **Authorized JavaScript origins:**
     - `http://localhost:3000` (local dev)
     - `https://your-production-domain.com`
   - **Authorized redirect URIs:**
     - `http://localhost:3000/api/auth/google/callback`
     - `https://your-production-domain.com/api/auth/google/callback`
   - Save. Copy the **Client ID** and **Client Secret** into `.env` as
     `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.
4. Set `GOOGLE_CALLBACK_URL` in `.env` to match exactly the redirect URI
   for the environment you're running in (protocol, host, and path must
   be byte-for-byte identical to what's registered).
5. Publish the OAuth consent screen when ready for real users (Google
   otherwise limits unverified apps to ~100 test users and shows an
   "unverified app" warning screen).

## 5. How the auth flow works

- **Register** (`POST /api/auth/register`): validates input, hashes the
  password with bcrypt (10 salt rounds), creates an **unverified** user,
  generates a 6-digit OTP, stores a **bcrypt hash of the OTP** (not the
  raw code) with a 10-minute expiry, and emails it via Resend. No session
  is created yet.
- **Verify OTP** (`POST /api/auth/verify-otp`): compares the submitted
  code against the stored hash, checks expiry, locks out after 5 wrong
  attempts on a given code, marks `isVerified: true`, then issues the JWT
  as an httpOnly cookie.
- **Resend OTP** (`POST /api/auth/resend-otp`): rate-limited to once per
  60 seconds per account; always returns the same generic response
  whether or not the email exists, to avoid leaking which emails are
  registered.
- **Login** (`POST /api/auth/login`): rejects unverified accounts (and
  automatically fires off a fresh OTP so the frontend can send the user
  straight to the verification screen), otherwise compares the bcrypt
  hash and issues the JWT cookie.
- **Google** (`GET /api/auth/google`):
  redirects to the provider's consent screen. On the `/callback` route,
  Passport resolves the profile; `findOrCreateOAuthUser` either links the
  identity to an existing account (matched by email) or creates a new,
  auto-verified user. The server then issues the same JWT cookie used by
  the password flow and redirects to `oauth-success.html`, which fetches
  `/api/auth/me` once to populate the frontend's cached profile before
  landing on the dashboard.
- **Session**: the JWT lives in an `httpOnly`, `Secure` (in production),
  `SameSite` cookie — never in `localStorage`, so client-side JS (and any
  XSS payload) cannot read or exfiltrate it. `authMiddleware.protect`
  reads it from `req.cookies.token` on every protected request (falling
  back to an `Authorization: Bearer` header for non-browser clients).

## 6. Cookie & CORS behavior by deployment shape

**Same-origin deployment (frontend served by this same Express app, as in
this project)** — this is the default and needs no extra configuration:
`SameSite=Lax` works, and `CLIENT_URL` should just be your one public URL.

**Split deployment (separate frontend origin, e.g. a static site on
Vercel/Netlify calling an API on Render/Railway)**:
- Set `NODE_ENV=production` so cookies get `Secure: true` and
  `SameSite: 'none'` (required for cross-site cookies — browsers reject
  `SameSite=None` cookies that aren't also `Secure`, so this only works
  over HTTPS).
- Set `CLIENT_URL` to the exact frontend origin(s), comma-separated if
  there's more than one (e.g. a staging and a production domain).
- The frontend's `fetch` calls must include `credentials: 'include'`
  (already done in `public/js/api.js`).
- Both origins must be served over HTTPS in production — mixed
  HTTP/HTTPS will silently break cookie delivery.

## 7. Production checklist

- [ ] Rotate DB credentials and JWT secret (see top of this doc).
- [ ] `NODE_ENV=production` set on the server.
- [ ] All OAuth redirect URIs registered in Google Cloud Console match the
      deployed domain exactly.
- [ ] `CLIENT_URL` includes only real, trusted origins — never `*` when
      `credentials: true` is set in CORS (browsers block that combination
      anyway, but double-check).
- [ ] Resend sending domain verified (SPF/DKIM records added) so OTP
      emails don't land in spam.
- [ ] HTTPS everywhere (required for `Secure` cookies).
- [ ] Rate limiting in front of `/api/auth/*` (e.g. `express-rate-limit`)
      to slow down credential-stuffing and OTP brute-force attempts beyond
      the built-in 5-attempt/60-second guards already in the controller.
- [ ] Google OAuth consent screen published (out of "Testing" status).
