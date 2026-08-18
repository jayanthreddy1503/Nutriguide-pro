const togglePw = document.getElementById('togglePw');
const pwInput = document.getElementById('password');
togglePw.addEventListener('click', () => {
  const show = pwInput.type === 'password';
  pwInput.type = show ? 'text' : 'password';
  togglePw.innerHTML = show ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
});

// Already logged in? No need to register again.
if (Auth.isLoggedIn()) {
  window.location.href = 'dashboard.html';
}

const registerStep = document.getElementById('registerStep');
const otpStep = document.getElementById('otpStep');
let pendingEmail = ''; // the email currently being verified
let resendTimerHandle = null;

function showOtpStep(email) {
  pendingEmail = email;
  document.getElementById('otpEmailLabel').textContent = email;
  registerStep.classList.add('hidden');
  otpStep.classList.remove('hidden');
  document.querySelectorAll('.otp-box').forEach(box => (box.value = ''));
  document.querySelector('.otp-box[data-idx="0"]').focus();
  startResendCountdown(60);
}

function showRegisterStep() {
  otpStep.classList.add('hidden');
  registerStep.classList.remove('hidden');
  if (resendTimerHandle) clearInterval(resendTimerHandle);
}

async function handleRegister() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  const successMsg = document.getElementById('successMsg');
  errorMsg.classList.add('hidden');
  successMsg.classList.add('hidden');

  if (!name || !email || !password) {
    errorMsg.textContent = 'Please fill in all fields.';
    errorMsg.classList.remove('hidden');
    return;
  }
  if (password.length < 6) {
    errorMsg.textContent = 'Password must be at least 6 characters.';
    errorMsg.classList.remove('hidden');
    return;
  }

  const btn = document.querySelector('#registerStep .submit-btn');
  btn.disabled = true;
  btn.style.opacity = '0.7';

  try {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: { name, email, password }
    });

    // Registration never logs the user in directly — they must verify first.
    // (This also covers the "account exists but was never verified" case,
    // which the backend answers with 200 + requiresVerification: true.)
    showOtpStep(data.email || email);

  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.classList.remove('hidden');
  } finally {
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

// ---------------- OTP step ----------------

// Auto-advance focus between the 6 OTP boxes, and allow pasting the whole code.
const otpBoxes = Array.from(document.querySelectorAll('.otp-box'));
otpBoxes.forEach((box, i) => {
  box.addEventListener('input', () => {
    box.value = box.value.replace(/\D/g, '').slice(0, 1);
    if (box.value && otpBoxes[i + 1]) otpBoxes[i + 1].focus();
  });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !box.value && otpBoxes[i - 1]) {
      otpBoxes[i - 1].focus();
    }
  });
  box.addEventListener('paste', (e) => {
    const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
    if (!pasted) return;
    e.preventDefault();
    pasted.slice(0, 6).split('').forEach((digit, idx) => {
      if (otpBoxes[idx]) otpBoxes[idx].value = digit;
    });
    const last = Math.min(pasted.length, 6) - 1;
    if (otpBoxes[last]) otpBoxes[last].focus();
  });
});

function getOtpValue() {
  return otpBoxes.map(b => b.value).join('');
}

async function handleVerifyOtp() {
  const otp = getOtpValue();
  const errorMsg = document.getElementById('otpErrorMsg');
  const successMsg = document.getElementById('otpSuccessMsg');
  errorMsg.classList.add('hidden');
  successMsg.classList.add('hidden');

  if (otp.length !== 6) {
    errorMsg.textContent = 'Please enter the full 6-digit code.';
    errorMsg.classList.remove('hidden');
    return;
  }

  const btn = document.getElementById('verifyOtpBtn');
  btn.disabled = true;
  btn.style.opacity = '0.7';

  try {
    const data = await apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: { email: pendingEmail, otp }
    });

    Auth.setSession(data.user);
    successMsg.textContent = '✅ Email verified! Redirecting...';
    successMsg.classList.remove('hidden');
    setTimeout(() => { window.location.href = 'profile.html'; }, 1000);

  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.classList.remove('hidden');
  } finally {
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

async function handleResendOtp() {
  const errorMsg = document.getElementById('otpErrorMsg');
  const successMsg = document.getElementById('otpSuccessMsg');
  errorMsg.classList.add('hidden');
  successMsg.classList.add('hidden');

  try {
    const data = await apiRequest('/auth/resend-otp', {
      method: 'POST',
      body: { email: pendingEmail }
    });
    successMsg.textContent = data.message || 'A new code has been sent.';
    successMsg.classList.remove('hidden');
    startResendCountdown(60);
  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.classList.remove('hidden');
  }
}

function startResendCountdown(seconds) {
  const countdownEl = document.getElementById('resendCountdown');
  const timerLabel = document.getElementById('resendTimerLabel');
  const resendBtn = document.getElementById('resendOtpBtn');

  let remaining = seconds;
  countdownEl.textContent = remaining;
  timerLabel.classList.remove('hidden');
  resendBtn.classList.add('hidden');

  if (resendTimerHandle) clearInterval(resendTimerHandle);
  resendTimerHandle = setInterval(() => {
    remaining -= 1;
    countdownEl.textContent = remaining;
    if (remaining <= 0) {
      clearInterval(resendTimerHandle);
      timerLabel.classList.add('hidden');
      resendBtn.classList.remove('hidden');
    }
  }, 1000);
}

document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (!otpStep.classList.contains('hidden')) {
    handleVerifyOtp();
  } else {
    handleRegister();
  }
});

// If we arrived here from login.js because the account exists but isn't
// verified yet, jump straight to the OTP screen.
(function checkDeepLinkToOtp() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('verify') === '1' && params.get('email')) {
    showOtpStep(decodeURIComponent(params.get('email')));
  }
})();

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
    console.log('Could not load live stats:', err.message);
  }
}

function formatUserCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K+`;
  return `${n}+`;
}

loadAuthStats();
