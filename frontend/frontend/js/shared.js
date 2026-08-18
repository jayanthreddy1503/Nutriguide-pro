// Shared sidebar mobile toggle + auth guard for every protected page.

// Protect this page — bounce back to login if there's no valid session.
requireAuth();

const toggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

if (toggle && sidebar && overlay) {
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });
}

// Show user name in topbar
function loadUserName() {
  const user = Auth.getUser();
  const nameEl = document.getElementById('userName');
  const avatarEl = document.getElementById('userAvatar');
  if (nameEl && user.name) nameEl.textContent = user.name;
  if (avatarEl && user.name) avatarEl.textContent = user.name.charAt(0).toUpperCase();
}
loadUserName();

// Logout — clears the httpOnly cookie server-side (client JS can't touch it
// directly) and wipes the local UI cache.
async function logout() {
  try {
    await apiRequest('/auth/logout', { method: 'POST' });
  } catch (err) {
    // Even if the request fails, still clear local state and leave —
    // there's nothing useful to retry here.
    console.log('Logout request failed:', err.message);
  }
  Auth.clearSession();
  window.location.href = 'login.html';
}
// Logout handler — works on ALL pages
document.addEventListener('DOMContentLoaded', function () {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      logout();
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────
// Toast notifications + confirm dialog — replaces native alert()/confirm()
// with realistic in-app UI. Available on every page that loads shared.js.
// ─────────────────────────────────────────────────────────────────────────

function ensureToastContainer() {
  let el = document.getElementById('toastContainer');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toastContainer';
    el.className = 'toast-container';
    document.body.appendChild(el);
  }
  return el;
}

// toast('Message', 'success' | 'error' | 'info' | 'warning')
function toast(message, type = 'info', duration = 3800) {
  const container = ensureToastContainer();

  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-exclamation',
    warning: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  };

  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `
    <i class="fas ${icons[type] || icons.info}"></i>
    <span class="toast-msg"></span>
    <button class="toast-close" aria-label="Dismiss"><i class="fas fa-xmark"></i></button>
  `;
  el.querySelector('.toast-msg').textContent = message;

  const remove = () => {
    el.classList.add('toast-out');
    setTimeout(() => el.remove(), 200);
  };
  el.querySelector('.toast-close').addEventListener('click', remove);

  container.appendChild(el);
  requestAnimationFrame(() => el.classList.add('toast-in'));

  if (duration > 0) setTimeout(remove, duration);
  return el;
}

// confirmDialog('Are you sure?') -> Promise<boolean>, replaces window.confirm()
function confirmDialog(message, { confirmText = 'Confirm', cancelText = 'Cancel' } = {}) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
      <div class="confirm-box">
        <p class="confirm-msg"></p>
        <div class="confirm-actions">
          <button class="confirm-cancel"></button>
          <button class="confirm-ok"></button>
        </div>
      </div>
    `;
    overlay.querySelector('.confirm-msg').textContent = message;
    overlay.querySelector('.confirm-cancel').textContent = cancelText;
    overlay.querySelector('.confirm-ok').textContent = confirmText;

    function close(result) {
      overlay.classList.add('confirm-out');
      setTimeout(() => overlay.remove(), 150);
      resolve(result);
    }

    overlay.querySelector('.confirm-cancel').addEventListener('click', () => close(false));
    overlay.querySelector('.confirm-ok').addEventListener('click', () => close(true));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(false); });

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('confirm-in'));
  });
}
