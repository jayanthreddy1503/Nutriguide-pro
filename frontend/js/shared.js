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