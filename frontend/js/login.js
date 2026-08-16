// Toggle password visibility
const togglePw = document.getElementById('togglePw');
const pwInput = document.getElementById('password');
togglePw.addEventListener('click', () => {
  const show = pwInput.type === 'password';
  pwInput.type = show ? 'text' : 'password';
  togglePw.innerHTML = show ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
});

// Already logged in? Skip straight to the dashboard.
if (Auth.isLoggedIn()) {
  window.location.href = 'dashboard.html';
}

// Surface OAuth failures redirected back from the server (?error=oauth)
(function showOAuthErrorIfAny() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('error') === 'oauth') {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = 'Social sign-in failed or was cancelled. Please try again.';
    errorMsg.classList.remove('hidden');
  }
})();

async function handleLogin() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.classList.add('hidden');

  if (!email || !password) {
    errorMsg.textContent = 'Please fill in both email and password.';
    errorMsg.classList.remove('hidden');
    return;
  }

  const btn = document.getElementById('loginBtn');
  btn.disabled = true;
  btn.style.opacity = '0.7';

  try {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password }
    });

    Auth.setSession(data.user);
    window.location.href = 'dashboard.html';

  } catch (err) {
    // Unverified account — the backend already fired off a fresh OTP,
    // so send them straight to the verification screen.
    if (err.data && err.data.requiresVerification) {
      const target = `register.html?verify=1&email=${encodeURIComponent(err.data.email || email)}`;
      window.location.href = target;
      return;
    }
    errorMsg.textContent = err.message;
    errorMsg.classList.remove('hidden');
  } finally {
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

// Allow Enter key
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleLogin();
});

// Live platform stats (real registered-user count) instead of a hardcoded number.
async function loadAuthStats() {
  try {
    const data = await apiRequest('/auth/stats');
    const statBlocks = document.querySelectorAll('.auth-stats > div');
    if (statBlocks[0]) {
      statBlocks[0].querySelector('strong').textContent = formatUserCount(data.users);
    }
    if (statBlocks[1]) {
      statBlocks[1].querySelector('strong').textContent = `${data.successRate}%`;
    }
    if (statBlocks[2]) {
      statBlocks[2].querySelector('strong').textContent = `${data.dietPlans}+`;
    }
  } catch (err) {
    // Stats are decorative — if the backend isn't reachable yet, just keep the defaults.
    console.log('Could not load live stats:', err.message);
  }
}

function formatUserCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K+`;
  return `${n}+`;
}

loadAuthStats();
