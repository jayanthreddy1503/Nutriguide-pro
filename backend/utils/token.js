const jwt = require("jsonwebtoken");

const JWT_EXPIRES_IN = "7d";
const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days, matches JWT_EXPIRES_IN

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

// Centralized cookie options so login, OAuth callbacks, and logout
// all agree on exactly the same flags (mismatches are a common bug source).
function cookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true, // JS on the page can never read this cookie -> mitigates XSS token theft
    secure: isProd, // HTTPS-only in production; allow http on localhost for local dev
    // "None" is required if the frontend and API are on different domains (cross-site),
    // but that requires `secure: true`. Locally (same-site, http) we fall back to "Lax".
    sameSite: isProd ? "none" : "lax",
    maxAge: COOKIE_MAX_AGE_MS,
    path: "/"
  };
}

// Signs a JWT for the user and attaches it as an httpOnly cookie on the response.
function issueAuthCookie(res, userId) {
  const token = signToken(userId);
  res.cookie("token", token, cookieOptions());
  return token;
}

function clearAuthCookie(res) {
  const { maxAge, ...rest } = cookieOptions();
  res.clearCookie("token", rest);
}

// --- OAuth one-time exchange code -----------------------------------------
// Why this exists: setting the auth cookie directly on the /google/callback
// 302 redirect (Google -> our API -> frontend) makes our API domain look,
// to Chrome's newer "Bounce Tracking Mitigations" heuristic, like a
// transient "bounce" site the user never actually interacted with — Chrome
// can then wipe that domain's storage (including the cookie we just set)
// shortly after the redirect completes, since the redirect chain has no
// direct user interaction on our API's origin.
//
// Fix: don't set the real cookie during the redirect. Instead, mint a
// short-lived, single-use code and put THAT in the redirect URL. The
// frontend page then exchanges the code for the real cookie via a normal
// direct fetch() call (not a navigation/redirect), which isn't part of any
// "bounce" chain and is unaffected by this Chrome behavior.
const EXCHANGE_CODE_TTL = "2m";

function signExchangeCode(userId) {
  return jwt.sign({ id: userId, purpose: "oauth-exchange" }, process.env.JWT_SECRET, {
    expiresIn: EXCHANGE_CODE_TTL
  });
}

// Verifies the exchange code and returns the userId, or throws if invalid/expired/wrong purpose.
function verifyExchangeCode(code) {
  const payload = jwt.verify(code, process.env.JWT_SECRET);
  if (payload.purpose !== "oauth-exchange") {
    throw new Error("Invalid exchange code");
  }
  return payload.id;
}

module.exports = {
  signToken,
  issueAuthCookie,
  clearAuthCookie,
  cookieOptions,
  signExchangeCode,
  verifyExchangeCode
};
