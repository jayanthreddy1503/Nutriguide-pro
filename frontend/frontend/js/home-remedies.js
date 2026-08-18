// ================================================
// home-remedies.js — COMPLETE VERSION WITH BACKEND
// NutriGuide Pro — Home Remedy + Science Explorer
// Data loaded from /api/remedies
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

// ── Store all remedies in memory ───────────────
let allRemedies = [];

// ── Load all remedies from backend ────────────
async function loadAllRemedies() {
  const loadingEl = document.getElementById('remediesLoading');
  const gridEl    = document.getElementById('problemsGrid');
  const errorEl   = document.getElementById('remediesError');

  // Show loading
  if (loadingEl) loadingEl.style.display = 'block';
  if (gridEl)    gridEl.style.display    = 'none';
  if (errorEl)   errorEl.style.display   = 'none';

  try {
    const res  = await fetch(`${(typeof BACKEND_URL !== 'undefined' && BACKEND_URL) || ''}/api/remedies`);
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to load remedies');
    }

    allRemedies = data.data;

    // Hide loading, show grid
    if (loadingEl) loadingEl.style.display = 'none';
    if (gridEl)    gridEl.style.display    = 'grid';

    renderProblemCards(allRemedies);

  } catch (err) {
    console.error('Load remedies error:', err.message);
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl)   errorEl.style.display   = 'block';
  }
}

// ── Render problem cards in left grid ─────────
function renderProblemCards(remedies) {
  const grid = document.getElementById('problemsGrid');
  if (!grid) return;

  if (remedies.length === 0) {
    grid.innerHTML = `
      <div class="hr-no-results">
        <i class="fas fa-search"
           style="font-size:24px;margin-bottom:8px;"></i>
        <p>No results found.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = remedies.map(r => `
    <div
      class="hr-problem-card"
      data-problem="${r.problem}"
      onclick="showRemedy('${r.problem}')"
    >
      <span class="hr-problem-emoji">${r.emoji}</span>
      <span class="hr-problem-name">${r.problem}</span>
    </div>
  `).join('');
}

// ── Show remedy detail from backend ───────────
async function showRemedy(problemName) {
  const emptyState   = document.getElementById('remedyEmptyState');
  const detail       = document.getElementById('remedyDetail');
  const detailLoading = document.getElementById('detailLoading');

  // Mark active card
  document.querySelectorAll('.hr-problem-card').forEach(card => {
    card.classList.toggle(
      'active',
      card.dataset.problem === problemName
    );
  });

  // Show loading in right panel
  if (emptyState)    emptyState.style.display    = 'none';
  if (detail)        detail.style.display        = 'none';
  if (detailLoading) detailLoading.style.display = 'flex';

  try {
    const res  = await fetch(
      `${(typeof BACKEND_URL !== 'undefined' && BACKEND_URL) || ''}/api/remedies/` + encodeURIComponent(problemName)
    );
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || 'Remedy not found');
    }

    const remedy = data.data;

    // Hide loading, show detail
    if (detailLoading) detailLoading.style.display = 'none';
    if (detail)        detail.style.display        = 'flex';

    // Build compound badges
    const compoundBadges = remedy.activeCompounds
      .map(c => `<span class="hr-compound-badge">${c}</span>`)
      .join('');

    // Build lifestyle tips
    const tipsList = remedy.lifestyleTips
      .map(tip => `
        <li>
          <span class="hr-tip-dot">
            <i class="fas fa-check"></i>
          </span>
          ${tip}
        </li>
      `).join('');

    // Inject full detail HTML
    detail.innerHTML = `

      <!-- Header -->
      <div class="hr-detail-header">
        <div class="hr-detail-emoji">${remedy.emoji}</div>
        <div>
          <h2>${remedy.problem}</h2>
          <p>${remedy.remedy}</p>
        </div>
      </div>

      <!-- Traditional Remedy -->
      <div class="hr-section-card">
        <div class="hr-section-title">🌿 Traditional Remedy</div>
        <div class="hr-remedy-card">
          <p class="hr-remedy-name">${remedy.remedy}</p>
          <p class="hr-remedy-prep">${remedy.preparation}</p>
        </div>
      </div>

      <!-- The Science -->
      <div class="hr-section-card">
        <div class="hr-section-title">🔬 The Science</div>
        <p class="hr-science-text">${remedy.science}</p>
      </div>

      <!-- Active Compounds -->
      <div class="hr-section-card">
        <div class="hr-section-title">🌱 Active Compounds</div>
        <div class="hr-compounds-wrap">
          ${compoundBadges}
        </div>
      </div>

      <!-- Nutrition Benefit -->
      <div class="hr-section-card">
        <div class="hr-section-title">💊 Nutrition Benefit</div>
        <p class="hr-nutrition-text">
          ${remedy.nutritionBenefit}
        </p>
      </div>

      <!-- Lifestyle Tips -->
      <div class="hr-section-card">
        <div class="hr-section-title">🏃 Lifestyle Tips</div>
        <ul class="hr-tips-list">
          ${tipsList}
        </ul>
      </div>

      <!-- Doctor Warning -->
      <div class="hr-warning-card">
        <div class="hr-warning-title">
          <i class="fas fa-triangle-exclamation"></i>
          ⚕️ When to See a Doctor
        </div>
        <p class="hr-warning-text">${remedy.doctorWarning}</p>
      </div>

    `;

    // Scroll to detail on mobile
    if (window.innerWidth <= 1024) {
      detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

  } catch (err) {
    console.error('Show remedy error:', err.message);
    if (detailLoading) detailLoading.style.display = 'none';
    if (detail) {
      detail.style.display = 'flex';
      detail.innerHTML = `
        <div class="hr-load-error">
          <i class="fas fa-triangle-exclamation"></i>
          <p>Could not load remedy details. Please try again.</p>
          <button onclick="showRemedy('${problemName}')"
                  class="hr-retry-btn">
            <i class="fas fa-rotate-right"></i> Retry
          </button>
        </div>
      `;
    }
  }
}

// ── Search with backend API ────────────────────
async function searchRemedies(keyword) {
  const grid    = document.getElementById('problemsGrid');
  const loading = document.getElementById('remediesLoading');

  if (!keyword.trim()) {
    renderProblemCards(allRemedies);
    return;
  }

  try {
    const res  = await fetch(
      `${(typeof BACKEND_URL !== 'undefined' && BACKEND_URL) || ''}/api/remedies/search?q=` + encodeURIComponent(keyword)
    );
    const data = await res.json();

    if (data.success) {
      renderProblemCards(data.data);
    } else {
      renderProblemCards([]);
    }

  } catch (err) {
    // Fallback to local filter if search API fails
    const filtered = allRemedies.filter(r =>
      r.problem.toLowerCase().includes(keyword.toLowerCase())
    );
    renderProblemCards(filtered);
  }
}

// ── Init search ────────────────────────────────
function initSearch() {
  const searchInput = document.getElementById('remedySearch');
  if (!searchInput) return;

  let searchTimer = null;

  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.trim();

    // Debounce — wait 300ms after user stops typing
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchRemedies(keyword);
    }, 300);
  });

  // Enter key selects first result
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const firstCard = document.querySelector('.hr-problem-card');
      if (firstCard) {
        showRemedy(firstCard.dataset.problem);
      }
    }
  });
}

// ── DOM Ready ──────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  loadAllRemedies();
  initSearch();
});