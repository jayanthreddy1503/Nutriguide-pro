// Profile is now backed by the real database (per logged-in user) instead of
// only localStorage. We still cache the result in localStorage under the same
// 'nutriguide_profile' key so every other page (dashboard, BMI, recommendations,
// etc.) keeps working exactly as before without needing changes.

const user = Auth.getUser();
let profile = {};

async function loadProfile() {
  try {
    const data = await apiRequest('/profile/get', { method: 'GET' });
    profile = data.profile || {};
    localStorage.setItem('nutriguide_profile', JSON.stringify(profile));
  } catch (err) {
    // No profile saved yet — fall back to whatever's cached locally (if anything)
    profile = JSON.parse(localStorage.getItem('nutriguide_profile') || '{}');
  }

  if (profile.name || user.name) document.getElementById('name').value = profile.name || user.name || '';
  if (profile.age) document.getElementById('age').value = profile.age;
  if (profile.gender) document.getElementById('gender').value = profile.gender;
  if (profile.height) document.getElementById('height').value = profile.height;
  if (profile.weight) document.getElementById('weight').value = profile.weight;
  if (profile.goal) document.getElementById('goal').value = profile.goal;

  updateSummary(profile);
}

function updateSummary(p) {
  const n = p.name || user.name || 'Your Name';
  document.getElementById('psName').textContent = n;
  document.getElementById('psAvatar').textContent = n.charAt(0).toUpperCase();
  document.getElementById('psGoal').textContent = p.goal || 'No goal set';
  document.getElementById('psHeight').textContent = p.height || '--';
  document.getElementById('psWeight').textContent = p.weight || '--';
  document.getElementById('psAge').textContent = p.age || '--';
}

async function saveProfile() {
  const data = {
    name: document.getElementById('name').value.trim(),
    age: document.getElementById('age').value,
    gender: document.getElementById('gender').value,
    height: document.getElementById('height').value,
    weight: document.getElementById('weight').value,
    goal: document.getElementById('goal').value,
  };
  const msg = document.getElementById('message');
  if (!data.name || !data.age || !data.gender || !data.height || !data.weight || !data.goal) {
    msg.textContent = 'Please fill in all fields.';
    msg.className = 'save-msg error';
    msg.classList.remove('hidden');
    return;
  }

  try {
    const result = await apiRequest('/profile/save', { method: 'POST', body: data });
    profile = result.profile || data;
    localStorage.setItem('nutriguide_profile', JSON.stringify(profile));

    const u = Auth.getUser();
    u.name = data.name;
    localStorage.setItem('nutriguide_user', JSON.stringify(u));

    msg.textContent = '✅ Profile saved successfully!';
    msg.className = 'save-msg success';
    msg.classList.remove('hidden');
    updateSummary(profile);
    document.getElementById('userAvatar').textContent = data.name.charAt(0).toUpperCase();
  } catch (err) {
    msg.textContent = err.message;
    msg.className = 'save-msg error';
    msg.classList.remove('hidden');
  }

  setTimeout(() => msg.classList.add('hidden'), 3000);
}

loadProfile();
