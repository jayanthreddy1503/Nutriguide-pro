// ================================================
// heatwave.js — COMPLETE VERSION WITH BACKEND
// NutriGuide Pro — Heatwave & Climate Health Alert
// Weather fetched via /api/weather/current
// ================================================

// ── Page Init ──────────────────────────────────
window.addEventListener('load', function () {

  // Load avatar
  try {
    const stored = localStorage.getItem('user');
    if (stored) {
      const userData = JSON.parse(stored);
      const avatar   = document.getElementById('userAvatar');
      if (avatar && userData.name) {
        avatar.textContent = userData.name.charAt(0).toUpperCase();
      }
    }
  } catch (e) { /* ignore */ }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
      window.location.href = 'login.html';
    });
  }

  // Sidebar toggle
  const toggle  = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (toggle && sidebar) {
    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('show');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function () {
      if (sidebar) sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

});

// ── Water log localStorage key ─────────────────
const HW_WATER_KEY = 'hw_water_log';

// ── Current goal in ml (updated after weather loads)
let currentGoalMl = 3000;

// ── Today key for water reset ──────────────────
function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

// ── Get water data from localStorage ──────────
function getWaterData() {
  try {
    const data  = JSON.parse(
      localStorage.getItem(HW_WATER_KEY) || '{}'
    );
    const today = getTodayKey();
    if (data.date !== today) {
      return { date: today, consumed: 0 };
    }
    return data;
  } catch {
    return { date: getTodayKey(), consumed: 0 };
  }
}

// ── Save water data to localStorage ───────────
function saveWaterData(data) {
  try {
    localStorage.setItem(HW_WATER_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Could not save water data:', e);
  }
}

// ── Log water intake ───────────────────────────
function logWater(ml) {
  const data     = getWaterData();
  data.consumed += ml;
  saveWaterData(data);
  updateWaterUI(data.consumed);
}

// ── Reset water intake ─────────────────────────
function resetWater() {
  const data = { date: getTodayKey(), consumed: 0 };
  saveWaterData(data);
  updateWaterUI(0);
}

// ── Update water progress UI ───────────────────
function updateWaterUI(consumed) {
  const pct = Math.min(
    Math.round((consumed / currentGoalMl) * 100),
    100
  );

  const consumedEl = document.getElementById('consumedDisplay');
  const pctEl      = document.getElementById('progressPctDisplay');
  const barEl      = document.getElementById('waterProgressBar');

  if (consumedEl) consumedEl.textContent = consumed + ' ml';
  if (pctEl)      pctEl.textContent      = pct + '%';
  if (barEl) {
    barEl.style.width      = pct + '%';
    barEl.style.background = pct >= 100
      ? 'linear-gradient(90deg,#10b981,#059669)'
      : 'linear-gradient(90deg,#38bdf8,#0ea5e9)';
  }
}

// ── Weather icon from temp and condition ───────
function getWeatherIcon(temp, condition) {
  const c = (condition || '').toLowerCase();
  if (c.includes('rain'))  return '🌧️';
  if (c.includes('cloud')) return '⛅';
  if (c.includes('storm')) return '⛈️';
  if (temp >= 38)          return '🔥';
  if (temp >= 30)          return '☀️';
  return '🌤️';
}

// ── Render weather UI from API data ───────────
function renderWeather(data) {
  const {
    temperature, feelsLike, humidity,
    condition, mode, waterGoal, fetchedAt
  } = data;

  currentGoalMl = waterGoal.ml;

  // Hide loading, show content
  const loading = document.getElementById('weatherLoading');
  const content = document.getElementById('weatherContent');
  const retry   = document.getElementById('retrySection');
  if (loading) loading.style.display = 'none';
  if (retry)   retry.style.display   = 'none';
  if (content) content.style.display = 'block';

  // Temperature and condition
  const tempEl      = document.getElementById('tempDisplay');
  const condEl      = document.getElementById('conditionDisplay');
  const humEl       = document.getElementById('humidityDisplay');
  const feelEl      = document.getElementById('feelsLikeDisplay');
  const iconEl      = document.getElementById('weatherIcon');
  const updatedEl   = document.getElementById('updatedDisplay');

  if (tempEl)    tempEl.textContent    = temperature + '°C';
  if (condEl)    condEl.textContent    = condition;
  if (humEl)     humEl.textContent     = humidity + '%';
  if (feelEl)    feelEl.textContent    = feelsLike + '°C';
  if (iconEl)    iconEl.textContent    = getWeatherIcon(temperature, condition);
  if (updatedEl) updatedEl.textContent = new Date(fetchedAt)
    .toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  // Mode badge
  const badge = document.getElementById('modeBadge');
  if (badge) {
    if (mode === 'heatwave') {
      badge.textContent = '🔴 Heatwave';
      badge.className   = 'hw-mode-badge badge-heatwave';
    } else if (mode === 'hot') {
      badge.textContent = '☀️ Hot Day';
      badge.className   = 'hw-mode-badge badge-hot';
    } else {
      badge.textContent = '🌤️ Normal';
      badge.className   = 'hw-mode-badge badge-normal';
    }
  }

  // Water goal card
  const goalDisplay = document.getElementById('waterGoalDisplay');
  const goalReason  = document.getElementById('waterGoalReason');
  const wgCard      = document.getElementById('waterGoalCard');

  if (goalDisplay) goalDisplay.textContent = waterGoal.amount;
  if (goalReason) {
    goalReason.textContent =
      mode === 'heatwave' ? 'Heatwave — drink every 20–30 min'
      : mode === 'hot'    ? 'Hot weather — increase intake'
      :                     'Normal day — stay regularly hydrated';
  }

  if (wgCard) {
    if (mode === 'heatwave') {
      wgCard.style.borderLeft = '4px solid #ef4444';
      if (goalDisplay) goalDisplay.style.color = '#ef4444';
    } else if (mode === 'hot') {
      wgCard.style.borderLeft = '4px solid #f97316';
      if (goalDisplay) goalDisplay.style.color = '#f97316';
    } else {
      wgCard.style.borderLeft = '4px solid #0ea5e9';
      if (goalDisplay) goalDisplay.style.color = '#0ea5e9';
    }
  }

  // Alert banner on heatwave
  const banner     = document.getElementById('alertBanner');
  const bannerText = document.getElementById('alertBannerText');
  if (banner && mode === 'heatwave') {
    banner.style.display = 'flex';
    if (bannerText) {
      bannerText.textContent =
        `⚠️ HEATWAVE ALERT — Temperature ${temperature}°C. ` +
        `Stay indoors. Drink water every 20–30 minutes.`;
    }
  }

  // Show correct mode card
  const modeNormal   = document.getElementById('modeNormal');
  const modeHot      = document.getElementById('modeHot');
  const modeHeatwave = document.getElementById('modeHeatwave');
  if (modeNormal)   modeNormal.style.display   = mode === 'normal'   ? 'block' : 'none';
  if (modeHot)      modeHot.style.display      = mode === 'hot'      ? 'block' : 'none';
  if (modeHeatwave) modeHeatwave.style.display = mode === 'heatwave' ? 'block' : 'none';

  // Temp label inside mode cards
  const tempLabel = `${temperature}°C — ${condition}`;
  const normalTemp    = document.getElementById('normalTemp');
  const hotTemp       = document.getElementById('hotTemp');
  const heatwaveTemp  = document.getElementById('heatwaveTemp');
  if (normalTemp)   normalTemp.textContent   = tempLabel;
  if (hotTemp)      hotTemp.textContent      = tempLabel;
  if (heatwaveTemp) heatwaveTemp.textContent = tempLabel;

  // Update water UI with today's consumed
  const waterData = getWaterData();
  updateWaterUI(waterData.consumed);
}

// ── Show fallback when API fails ───────────────
function showFallback() {
  const loading = document.getElementById('weatherLoading');
  const content = document.getElementById('weatherContent');
  const retry   = document.getElementById('retrySection');
  const fallback = document.getElementById('fallbackSection');

  if (loading)  loading.style.display  = 'none';
  if (content)  content.style.display  = 'block';
  if (retry)    retry.style.display    = 'block';
  if (fallback) fallback.style.display = 'block';

  // Show offline state in weather card
  const tempEl    = document.getElementById('tempDisplay');
  const condEl    = document.getElementById('conditionDisplay');
  const humEl     = document.getElementById('humidityDisplay');
  const feelEl    = document.getElementById('feelsLikeDisplay');
  const iconEl    = document.getElementById('weatherIcon');
  const updatedEl = document.getElementById('updatedDisplay');
  const badge     = document.getElementById('modeBadge');

  if (tempEl)    tempEl.textContent    = 'N/A';
  if (condEl)    condEl.textContent    = 'Data unavailable';
  if (humEl)     humEl.textContent     = '--';
  if (feelEl)    feelEl.textContent    = '--';
  if (iconEl)    iconEl.textContent    = '📡';
  if (updatedEl) updatedEl.textContent = 'Offline';
  if (badge) {
    badge.textContent = '⚠️ Offline';
    badge.className   = 'hw-mode-badge badge-hot';
  }

  // Hide all mode cards
  const modeNormal   = document.getElementById('modeNormal');
  const modeHot      = document.getElementById('modeHot');
  const modeHeatwave = document.getElementById('modeHeatwave');
  if (modeNormal)   modeNormal.style.display   = 'none';
  if (modeHot)      modeHot.style.display      = 'none';
  if (modeHeatwave) modeHeatwave.style.display = 'none';

  // Default water goal
  currentGoalMl = 3000;
  const goalDisplay = document.getElementById('waterGoalDisplay');
  const goalReason  = document.getElementById('waterGoalReason');
  if (goalDisplay) goalDisplay.textContent = '3.0 L';
  if (goalReason)  goalReason.textContent  =
    'General recommendation for Anantapur region';

  const waterData = getWaterData();
  updateWaterUI(waterData.consumed);
}

// ── Fetch weather from backend ─────────────────
async function fetchWeather() {
  try {
    const res  = await fetch(`${(typeof BACKEND_URL !== 'undefined' && BACKEND_URL) || ''}/api/weather/current`);
    const data = await res.json();

    if (data.success) {
      renderWeather(data.data);
    } else {
      // Fallback data returned from backend
      console.warn('Weather fallback:', data.message);
      showFallback();
    }

  } catch (err) {
    console.warn('Weather fetch failed:', err.message);
    showFallback();
  }
}

// ── Retry weather fetch ────────────────────────
function retryWeather() {
  const retry   = document.getElementById('retrySection');
  const loading = document.getElementById('weatherLoading');
  const fallback = document.getElementById('fallbackSection');

  if (retry)    retry.style.display    = 'none';
  if (loading)  loading.style.display  = 'flex';
  if (fallback) fallback.style.display = 'none';

  fetchWeather();
}

// ── Init on DOM ready ──────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  fetchWeather();

  // Auto refresh every 30 minutes
  setInterval(fetchWeather, 30 * 60 * 1000);
});