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

module.exports = { signToken, issueAuthCookie, clearAuthCookie, cookieOptions };
