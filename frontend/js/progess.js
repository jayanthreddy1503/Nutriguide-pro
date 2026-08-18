// Load data
const profile = JSON.parse(localStorage.getItem('nutriguide_profile') || '{}');
let logs = JSON.parse(localStorage.getItem('nutriguide_weight_log') || '[]');

// --- Stat Cards ---
const currentW = profile.weight ? parseFloat(profile.weight) : null;
document.getElementById('currentWeight').textContent = currentW ? `${currentW} kg` : '--';
document.getElementById('goalText').textContent = profile.goal || '--';

if (profile.weight && profile.height) {
  const h = profile.height / 100;
  const bmi = (profile.weight / (h * h)).toFixed(1);
  document.getElementById('bmiText').textContent = bmi;
} else {
  document.getElementById('bmiText').textContent = '--';
}

// Health score (reuse same logic)
function getScore() {
  let score = 60;
  if (profile.weight && profile.height) {
    const h = profile.height / 100;
    const bmi = profile.weight / (h * h);
    if (bmi >= 18.5 && bmi <= 24.9) score += 20;
    else if (bmi >= 25 && bmi <= 29.9) score += 10;
  }
  const water = JSON.parse(localStorage.getItem('nutriguide_water') || '{"amount":0}');
  if (water.amount >= 2000) score += 12;
  else if (water.amount >= 1000) score += 6;
  if (profile.goal) score += 8;
  return Math.min(score, 100);
}
document.getElementById('hScoreText').textContent = `${getScore()}%`;

// --- Progress Bar ---
function computeProgress() {
  if (!profile.goal || !currentW) {
    document.getElementById('progressMessage').textContent =
      '📋 Complete your profile to start tracking your progress.';
    return;
  }

  // Use log entries or fallback to profile weight
  const startW = logs.length > 0 ? parseFloat(logs[0].weight) : currentW;
  const latestW = logs.length > 0 ? parseFloat(logs[logs.length - 1].weight) : currentW;

  let pct = 0, message = '';
  if (profile.goal === 'Weight Loss') {
    const target = startW * 0.9; // 10% loss target
    const lost = startW - latestW;
    const needed = startW - target;
    pct = needed > 0 ? Math.min((lost / needed) * 100, 100) : 100;
    message = pct >= 100
      ? '🎉 Goal achieved! You\'ve hit your weight loss target!'
      : `💪 ${Math.max(0, (latestW - target).toFixed(1))} kg to go. Keep pushing!`;
  } else if (profile.goal === 'Weight Gain') {
    const target = startW * 1.1; // 10% gain target
    const gained = latestW - startW;
    const needed = target - startW;
    pct = needed > 0 ? Math.min((gained / needed) * 100, 100) : 100;
    message = pct >= 100
      ? '🎉 Goal achieved! You\'ve hit your weight gain target!'
      : `💪 ${Math.max(0, (target - latestW).toFixed(1))} kg to gain. Stay consistent!`;
  } else {
    // Maintain — track how many days they've logged
    pct = Math.min((logs.length / 7) * 100, 100);
    message = `✅ Maintenance mode — log your weight daily. ${logs.length}/7 days this week.`;
  }

  pct = Math.round(pct);
  document.getElementById('progressFill').style.width = `${pct}%`;
  document.getElementById('progPct').textContent = `${pct}%`;
  document.getElementById('progressMessage').textContent = message;
  document.getElementById('progressSub').textContent =
    `Goal: ${profile.goal} · Current: ${latestW} kg`;
}

// --- Render History ---
function renderHistory() {
  const el = document.getElementById('weightHistory');
  if (logs.length === 0) {
    el.innerHTML = '<li class="wh-empty">No weight logs yet. Log your first entry!</li>';
    return;
  }
  el.innerHTML = logs.slice().reverse().map((entry, i, arr) => {
    // Compare to previous in chronological order (reversed means i+1 is earlier)
    const prev = arr[i + 1];
    let changeHtml = '';
    if (prev) {
      const diff = (parseFloat(entry.weight) - parseFloat(prev.weight)).toFixed(1);
      const cls = diff > 0 ? 'up' : diff < 0 ? 'down' : 'same';
      const arrow = diff > 0 ? '▲' : diff < 0 ? '▼' : '→';
      changeHtml = `<span class="wh-change ${cls}">${arrow} ${Math.abs(diff)} kg</span>`;
    }
    return `
      <li>
        <span class="wh-date">${entry.date}</span>
        <span class="wh-weight">${entry.weight} kg</span>
        ${changeHtml}
      </li>`;
  }).join('');
}

// --- Log Weight ---
function logWeight() {
  const val = parseFloat(document.getElementById('newWeight').value);
  if (!val || val < 20 || val > 300) {
    alert('Please enter a valid weight (20–300 kg).');
    return;
  }
  const now = new Date();
  const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  logs.push({ weight: val.toFixed(1), date });
  localStorage.setItem('nutriguide_weight_log', JSON.stringify(logs));

  // Update current weight in profile too
  profile.weight = val.toFixed(1);
  localStorage.setItem('nutriguide_profile', JSON.stringify(profile));
  document.getElementById('currentWeight').textContent = `${val.toFixed(1)} kg`;

  document.getElementById('newWeight').value = '';
  renderHistory();
  computeProgress();
  renderChart();
}

// Init
computeProgress();
renderHistory();

// ---- CHART ----
let chartInstance = null;

function renderChart() {
  if (logs.length < 2) {
    document.getElementById('graphCard').style.display = 'none';
    return;
  }
  document.getElementById('graphCard').style.display = 'block';

  const labels  = logs.map(l => l.date);
  const weights = logs.map(l => parseFloat(l.weight));

  const ctx = document.getElementById('weightChart').getContext('2d');
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Weight (kg)',
        data: weights,
        borderColor: '#3ecf8e',
        backgroundColor: 'rgba(62,207,142,0.12)',
        borderWidth: 3,
        pointBackgroundColor: '#2d9e6b',
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.parsed.y} kg`
          }
        }
      },
      scales: {
        y: {
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: {
            font: { family: 'Plus Jakarta Sans', size: 12 },
            callback: v => v + ' kg'
          }
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Plus Jakarta Sans', size: 11 } }
        }
      }
    }
  });
}

renderChart();
