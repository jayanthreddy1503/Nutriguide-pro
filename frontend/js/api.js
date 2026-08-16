// Shared API helper used across all pages.
// Centralizes the backend base URL, session state, and fetch error handling
// so every page talks to the real Express/MongoDB backend instead of just localStorage.
//
// AUTH MODEL: the JWT lives in an httpOnly cookie set by the server — client-side
// JS can never read it (that's the whole point, it blocks XSS token theft).
// So `Auth` here does NOT store a token. It only keeps a small, NON-sensitive
// "am I logged in" flag + a cached copy of the user's public profile, purely
// for instant UI rendering (name in the topbar, etc). The server is always
// the source of truth — every protected request still relies on the cookie.

const API_BASE = `${(typeof BACKEND_URL !== 'undefined' && BACKEND_URL) || ''}/api`;

const Auth = {
  setSession(user) {
    localStorage.setItem('nutriguide_authed', '1');
    localStorage.setItem('nutriguide_user', JSON.stringify(user || {}));
  },
  getUser() {
    return JSON.parse(localStorage.getItem('nutriguide_user') || '{}');
  },
  clearSession() {
    localStorage.removeItem('nutriguide_authed');
    localStorage.removeItem('nutriguide_user');
    localStorage.removeItem('nutriguide_profile');
  },
  isLoggedIn() {
    return localStorage.getItem('nutriguide_authed') === '1';
  }
};

// Generic API call wrapper. `credentials: 'include'` sends/receives the
// httpOnly auth cookie on every request — same-origin always works; for a
// split frontend/backend deployment the API's CORS config must allow it.
async function apiRequest(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined
    });
  } catch (networkErr) {
    throw new Error('Could not reach the server. Please check your connection and try again.');
  }

  let data = {};
  try {
    data = await response.json();
  } catch (_) {
    // No JSON body (e.g. 204) — leave data as {}
  }

  if (!response.ok) {
    // Session expired/invalid — force re-login on protected pages
    if (response.status === 401) {
      Auth.clearSession();
    }
    const err = new Error(data.message || 'Something went wrong. Please try again.');
    err.data = data; // lets callers inspect e.g. `requiresVerification`
    err.status = response.status;
    throw err;
  }

  return data;
}

// Redirect to login if there's no local "logged in" flag. This is just a fast
// UI guard — the real enforcement happens server-side via the httpOnly cookie
// on every protected API call (a forged flag alone gets you nothing).
function requireAuth() {
  if (!Auth.isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

// Wires up any element with [data-api-href="/some/path"] to point at the
// deployed backend (used for the Google OAuth button, which must be a plain
// full-page link, not a fetch — the browser needs to actually navigate to
// the provider's consent screen).
function wireApiLinks() {
  document.querySelectorAll('[data-api-href]').forEach((el) => {
    el.setAttribute('href', `${(typeof BACKEND_URL !== 'undefined' && BACKEND_URL) || ''}${el.getAttribute('data-api-href')}`);
  });
}
document.addEventListener('DOMContentLoaded', wireApiLinks);
