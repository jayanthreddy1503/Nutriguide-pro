// Load user data into dashboard
const user = Auth.getUser();

if (user.name) {
  document.getElementById('welcomeText').textContent = `Welcome back, ${user.name} 👋`;
}

// BMI
function calcBMI(weight, height) {
  const h = height / 100;
  return (weight / (h * h)).toFixed(1);
}

function getHealthScore(profile, waterData) {
  let score = 60;
  if (profile.weight && profile.height) {
    const bmi = parseFloat(calcBMI(profile.weight, profile.height));
    if (bmi >= 18.5 && bmi <= 24.9) score += 20;
    else if (bmi >= 25 && bmi <= 29.9) score += 10;
  }
  if (waterData.amount >= 2000) score += 12;
  else if (waterData.amount >= 1000) score += 6;
  if (profile.goal) score += 8;
  return Math.min(score, 100);
}

const goalExercises = {
  'Weight Loss': [
    { name: 'Jumping Jacks', sets: '3×30 reps', tip: 'Great warm-up cardio to burn fat fast.' },
    { name: 'Burpees', sets: '3×10 reps', tip: 'Full body fat burner — keep form tight.' },
    { name: 'High Knees', sets: '3×30 sec', tip: 'Elevates heart rate quickly.' },
    { name: 'Crunches', sets: '3×20 reps', tip: 'Core toning to flatten the belly.' },
  ],
  'Weight Gain': [
    { name: 'Push-Ups', sets: '4×15 reps', tip: 'Build chest and arm muscle mass.' },
    { name: 'Squats', sets: '4×15 reps', tip: 'Largest muscle group — biggest gains.' },
    { name: 'Bicep Curls', sets: '3×12 reps', tip: 'Isolate biceps for arm growth.' },
    { name: 'Deadlift (Bodyweight)', sets: '3×12 reps', tip: 'Strengthens full posterior chain.' },
  ],
  'Maintain Weight': [
    { name: 'Plank', sets: '3×45 sec', tip: 'Core stability and posture improvement.' },
    { name: 'Lunges', sets: '3×12 each leg', tip: 'Balance and leg tone maintenance.' },
    { name: 'Wall Sit', sets: '3×40 sec', tip: 'Isometric strength for quads.' },
    { name: 'Mountain Climbers', sets: '3×20 reps', tip: 'Cardio + core in one move.' },
  ]
};

function renderDashboard(profile) {
  if (profile.weight && profile.height) {
    document.getElementById('dashBmi').textContent = calcBMI(profile.weight, profile.height);
  }
  if (profile.goal) {
    document.getElementById('dashGoal').textContent = profile.goal;
  }

  const waterData = JSON.parse(localStorage.getItem('nutriguide_water') || '{"amount":0}');
  document.getElementById('dashWater').textContent = `${waterData.amount} ml`;

  document.getElementById('dashHealthScore').textContent = `${getHealthScore(profile, waterData)}%`;

  const goal = profile.goal;
  const exSection = document.getElementById('dashExerciseSection');
  if (goal && goalExercises[goal]) {
    const exList = goalExercises[goal];
    exSection.innerHTML = `
      <div class="dash-ex-grid">
        ${exList.map(ex => `
          <div class="dash-ex-card">
            <span class="dash-ex-tag"><i class="fas fa-dumbbell"></i> ${goal}</span>
            <h4>${ex.name}</h4>
            <p>${ex.tip}</p>
            <strong style="font-size:.82rem;color:var(--green-dark)">${ex.sets}</strong>
          </div>
        `).join('')}
      </div>
      <a href="exercises.html" style="display:inline-flex;align-items:center;gap:8px;margin-top:14px;font-size:.88rem;font-weight:700;color:var(--green-dark);text-decoration:none">
        View full exercise library <i class="fas fa-arrow-right"></i>
      </a>`;
  }
}

async function initDashboard() {
  let profile = JSON.parse(localStorage.getItem('nutriguide_profile') || '{}');

  try {
    const data = await apiRequest('/profile/get', { method: 'GET' });
    profile = data.profile || {};
    localStorage.setItem('nutriguide_profile', JSON.stringify(profile));
  } catch (err) {
    // No profile yet (404) or offline — render with whatever's cached locally.
  }

  renderDashboard(profile);
}

initDashboard();
