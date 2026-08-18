// ================================================
// nutrition-decoder.js — COMPLETE VERSION
// With MongoDB backend save + history
// NutriGuide Pro
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

  // Logout button
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

  // Sidebar toggle for mobile
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

// ── Daily Values (2000 kcal diet) ──────────────
const DV = {
  calories:   2000,
  protein:    50,
  fat:        78,
  carbs:      300,
  sugar:      50,
  addedSugar: 25,
  fiber:      28,
  sodium:     2300,
  calcium:    1300,
  iron:       18,
  potassium:  4700,
  vitc:       90
};

// ── Nutrient Definitions ────────────────────────
const NUTRIENTS = {
  calories: {
    label: 'Calories',
    icon: '🔥',
    unit: 'kcal',
    dvKey: 'calories',
    explain: (v) =>
      `Calories measure the energy this food provides. ${v} kcal per serving is ${Math.round((v / 2000) * 100)}% of a standard 2000 kcal daily intake. Your body uses calories for everything — breathing, movement, and cell repair.`,
    rate: (v) =>
      v > 500 ? 'occasional' : v > 300 ? 'good' : 'excellent',
    fillClass: (r) =>
      r === 'excellent' ? 'fill-green'
      : r === 'good'    ? 'fill-teal'
      : 'fill-orange'
  },

  protein: {
    label: 'Protein',
    icon: '🥩',
    unit: 'g',
    dvKey: 'protein',
    explain: (v) =>
      `Protein builds and repairs muscles and keeps you full. ${v}g per serving provides ${Math.round((v / 50) * 100)}% of your daily requirement. Good sources include legumes, dairy, eggs, and lean meat.`,
    rate: (v) =>
      v >= 10 ? 'excellent' : v >= 5 ? 'good' : 'occasional',
    fillClass: () => 'fill-green'
  },

  fat: {
    label: 'Total Fat',
    icon: '🧈',
    unit: 'g',
    dvKey: 'fat',
    explain: (v) =>
      `Fat supports brain health and helps absorb vitamins A, D, E, and K. ${v}g per serving is ${Math.round((v / 78) * 100)}% of daily needs. Unsaturated fats from nuts, seeds, and avocados are preferred over saturated fats.`,
    rate: (v) =>
      v > 20 ? 'occasional' : v > 10 ? 'good' : 'excellent',
    fillClass: (r) =>
      r === 'excellent' ? 'fill-green'
      : r === 'good'    ? 'fill-teal'
      : 'fill-orange'
  },

  carbs: {
    label: 'Carbohydrates',
    icon: '🍞',
    unit: 'g',
    dvKey: 'carbs',
    explain: (v) =>
      `Carbohydrates are your body's primary energy source. ${v}g per serving equals ${Math.round((v / 300) * 100)}% of daily needs. Prefer complex carbs like oats, brown rice, and vegetables over refined carbs.`,
    rate: (v) =>
      v > 60 ? 'occasional' : v > 30 ? 'good' : 'excellent',
    fillClass: (r) =>
      r === 'excellent' ? 'fill-green'
      : r === 'good'    ? 'fill-teal'
      : 'fill-orange'
  },

  sugar: {
    label: 'Total Sugar',
    icon: '🍬',
    unit: 'g',
    dvKey: 'sugar',
    explain: (v) =>
      `Total sugar includes natural sugars from fruit and milk, and added sugars. ${v}g per serving. High sugar intake may contribute to blood sugar spikes. Natural sugars from whole fruits are preferred.`,
    rate: (v) =>
      v > 20  ? 'high-sugar'
      : v > 10 ? 'occasional'
      : v > 5  ? 'good'
      : 'excellent',
    fillClass: (r) =>
      r === 'excellent'  ? 'fill-green'
      : r === 'good'     ? 'fill-teal'
      : r === 'occasional' ? 'fill-orange'
      : 'fill-red'
  },

  addedSugar: {
    label: 'Added Sugar',
    icon: '➕',
    unit: 'g',
    dvKey: 'addedSugar',
    explain: (v) =>
      `Added sugars are added during processing — not naturally occurring. ${v}g represents ${Math.round((v / 25) * 100)}% of the recommended daily limit of 25g. Consistently high added sugar intake may be linked to various health concerns.`,
    rate: (v) =>
      v > 12 ? 'high-sugar' : v > 6 ? 'occasional' : 'good',
    fillClass: (r) =>
      r === 'good'       ? 'fill-teal'
      : r === 'occasional' ? 'fill-orange'
      : 'fill-red'
  },

  fiber: {
    label: 'Dietary Fiber',
    icon: '🌾',
    unit: 'g',
    dvKey: 'fiber',
    explain: (v) =>
      `Dietary fiber supports healthy digestion and keeps you full. ${v}g provides ${Math.round((v / 28) * 100)}% of your daily target. Most people benefit from more fiber through vegetables, legumes, and whole grains.`,
    rate: (v) =>
      v >= 5 ? 'excellent' : v >= 2 ? 'good' : 'occasional',
    fillClass: () => 'fill-green'
  },

  sodium: {
    label: 'Sodium',
    icon: '🧂',
    unit: 'mg',
    dvKey: 'sodium',
    explain: (v) =>
      `Sodium helps regulate fluid balance and nerve function. ${v}mg per serving is ${Math.round((v / 2300) * 100)}% of the daily limit of 2300mg. Regularly consuming high-sodium foods may affect blood pressure over time.`,
    rate: (v) =>
      v > 600 ? 'high-sodium' : v > 300 ? 'occasional' : 'good',
    fillClass: (r) =>
      r === 'good'       ? 'fill-teal'
      : r === 'occasional' ? 'fill-orange'
      : 'fill-amber'
  },

  calcium: {
    label: 'Calcium',
    icon: '🦴',
    unit: 'mg',
    dvKey: 'calcium',
    explain: (v) =>
      `Calcium is essential for strong bones and teeth, muscle function, and nerve signalling. ${v}mg provides ${Math.round((v / 1300) * 100)}% of daily needs. Good sources include dairy, leafy greens, sesame seeds, and ragi.`,
    rate: (v) =>
      v >= 300 ? 'excellent' : v >= 100 ? 'good' : 'occasional',
    fillClass: () => 'fill-green'
  },

  iron: {
    label: 'Iron',
    icon: '🩸',
    unit: 'mg',
    dvKey: 'iron',
    explain: (v) =>
      `Iron is needed to carry oxygen in your blood and support energy production. ${v}mg provides ${Math.round((v / 18) * 100)}% of your daily requirement. Good sources include spinach, lentils, dates, and lean meat.`,
    rate: (v) =>
      v >= 5 ? 'excellent' : v >= 2 ? 'good' : 'occasional',
    fillClass: () => 'fill-green'
  },

  potassium: {
    label: 'Potassium',
    icon: '🫀',
    unit: 'mg',
    dvKey: 'potassium',
    explain: (v) =>
      `Potassium supports healthy heart function, muscle contractions, and helps balance sodium levels. ${v}mg provides ${Math.round((v / 4700) * 100)}% of daily needs. Bananas, coconut water, and lentils are good natural sources.`,
    rate: (v) =>
      v >= 500 ? 'excellent' : v >= 200 ? 'good' : 'occasional',
    fillClass: () => 'fill-green'
  },

  vitc: {
    label: 'Vitamin C',
    icon: '🍊',
    unit: 'mg',
    dvKey: 'vitc',
    explain: (v) =>
      `Vitamin C supports your immune system, helps absorb iron from plant sources, and acts as an antioxidant. ${v}mg provides ${Math.round((v / 90) * 100)}% of daily needs. Citrus fruits, amla, guava, and bell peppers are excellent sources.`,
    rate: (v) =>
      v >= 20 ? 'excellent' : v >= 10 ? 'good' : 'occasional',
    fillClass: () => 'fill-green'
  }
};

// ── Badge Display Info ──────────────────────────
const BADGE_INFO = {
  'excellent':   { label: '✅ Excellent Choice',     cls: 'badge-excellent'   },
  'good':        { label: '👍 Good Choice',           cls: 'badge-good'        },
  'occasional':  { label: '⚠️ Consume Occasionally', cls: 'badge-occasional'  },
  'high-sugar':  { label: '🍬 High in Sugar',         cls: 'badge-high-sugar'  },
  'high-sodium': { label: '🧂 High in Sodium',        cls: 'badge-high-sodium' }
};

// ── Input Field Map ─────────────────────────────
const INPUT_MAP = {
  calories:   'inp-calories',
  protein:    'inp-protein',
  fat:        'inp-fat',
  carbs:      'inp-carbs',
  sugar:      'inp-sugar',
  addedSugar: 'inp-added-sugar',
  fiber:      'inp-fiber',
  sodium:     'inp-sodium',
  calcium:    'inp-calcium',
  iron:       'inp-iron',
  potassium:  'inp-potassium',
  vitc:       'inp-vitc'
};

// ── Get Healthier Alternatives ──────────────────
function getAlternatives(ratings) {
  const hasHighSugar  = Object.values(ratings).some(r => r === 'high-sugar');
  const hasHighSodium = Object.values(ratings).some(r => r === 'high-sodium');
  const hasHighFat    = ratings.fat === 'occasional';

  if (hasHighSugar) {
    return [
      { emoji: '🥛', name: 'Buttermilk'    },
      { emoji: '🍋', name: 'Lemon Water'   },
      { emoji: '🥥', name: 'Coconut Water' },
      { emoji: '🍎', name: 'Fresh Fruit'   },
      { emoji: '🌿', name: 'Herbal Tea'    },
      { emoji: '🥒', name: 'Cucumber'      }
    ];
  }
  if (hasHighSodium) {
    return [
      { emoji: '🥒', name: 'Cucumber'      },
      { emoji: '🍌', name: 'Banana'        },
      { emoji: '🥥', name: 'Coconut Water' },
      { emoji: '🫐', name: 'Berries'       },
      { emoji: '🌿', name: 'Herbal Tea'    },
      { emoji: '🥛', name: 'Buttermilk'    }
    ];
  }
  if (hasHighFat) {
    return [
      { emoji: '🥜', name: 'Mixed Nuts'   },
      { emoji: '🍎', name: 'Apple'        },
      { emoji: '🫐', name: 'Berries'      },
      { emoji: '🥛', name: 'Skimmed Milk' },
      { emoji: '🌿', name: 'Herbal Tea'   },
      { emoji: '🍌', name: 'Banana'       }
    ];
  }
  return [
    { emoji: '🥗', name: 'Salad Bowl'    },
    { emoji: '🍌', name: 'Banana'        },
    { emoji: '🥥', name: 'Coconut Water' },
    { emoji: '🫐', name: 'Berries'       },
    { emoji: '🌿', name: 'Herbal Tea'    },
    { emoji: '🥛', name: 'Buttermilk'    }
  ];
}

// ── Calculate Overall Score ─────────────────────
function calcScore(ratings) {
  const scoreMap = {
    'excellent':   100,
    'good':        70,
    'occasional':  40,
    'high-sugar':  20,
    'high-sodium': 25
  };
  const vals = Object.values(ratings);
  if (!vals.length) return 0;
  const total = vals.reduce((sum, r) => sum + (scoreMap[r] || 50), 0);
  return Math.round(total / vals.length);
}

// ── Render Overall Score Card ───────────────────
function renderOverall(score) {
  const color = score >= 70 ? '#10b981'
    : score >= 50 ? '#f97316' : '#ef4444';
  const bg    = score >= 70 ? '#dcfce7'
    : score >= 50 ? '#ffedd5' : '#fee2e2';
  const label = score >= 70
    ? 'Well Balanced Label'
    : score >= 50
    ? 'Moderate — Check highlighted values'
    : 'Review carefully before consuming regularly';

  const el = document.getElementById('overallCard');
  if (el) {
    el.innerHTML = `
      <div class="nd-overall-card">
        <div class="nd-overall-score-circle"
             style="background:${bg};color:${color};">
          <span>${score}</span>
          <small style="font-size:10px;font-weight:600;">/100</small>
        </div>
        <div class="nd-overall-info">
          <h4>Overall Nutrition Score</h4>
          <p>${label}</p>
          <p style="font-size:11px;color:#9ca3af;margin-top:4px;">
            Based on entered nutrient values
          </p>
        </div>
      </div>
    `;
  }
}

// ── Render Single Nutrient Card ─────────────────
function renderNutrient(key, value) {
  const n      = NUTRIENTS[key];
  const rating = n.rate(value);
  const badge  = BADGE_INFO[rating];
  const dvVal  = DV[n.dvKey];
  const pct    = dvVal
    ? Math.min(Math.round((value / dvVal) * 100), 150)
    : 0;
  const fill   = n.fillClass(rating);

  return `
    <div class="nd-nutrient-card ${rating}">
      <div class="nd-nutrient-top">
        <div>
          <div class="nd-nutrient-name">${n.icon} ${n.label}</div>
          <div class="nd-nutrient-amount">
            ${value} ${n.unit} per serving
          </div>
        </div>
        <span class="nd-badge ${badge.cls}">${badge.label}</span>
      </div>
      <p class="nd-nutrient-explanation">${n.explain(value)}</p>
      <div class="nd-dv-row">
        <span>% Daily Value</span>
        <span>${pct}%</span>
      </div>
      <div class="nd-dv-bar">
        <div class="nd-dv-fill ${fill}"
             style="width:0%"
             data-target="${Math.min(pct, 100)}">
        </div>
      </div>
    </div>
  `;
}

// ── Render Alternatives Section ─────────────────
function renderAlternatives(ratings) {
  const alts  = getAlternatives(ratings);
  const chips = alts.map(a => `
    <div class="nd-alt-chip">
      <span>${a.emoji}</span>
      ${a.name}
    </div>
  `).join('');

  const el = document.getElementById('altSection');
  if (el) {
    el.innerHTML = `
      <div class="nd-alt-section">
        <h4>🌿 Healthier Alternatives to Consider</h4>
        <div class="nd-alt-grid">${chips}</div>
      </div>
    `;
  }
}

// ── Animate Progress Bars ───────────────────────
function animateBars() {
  setTimeout(() => {
    document.querySelectorAll('.nd-dv-fill[data-target]')
      .forEach(bar => {
        bar.style.width = bar.dataset.target + '%';
      });
  }, 150);
}

// ── Clear All Inputs and Results ────────────────
function clearAll() {
  Object.values(INPUT_MAP).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.value             = '';
      el.style.borderColor = '';
      el.style.background  = '';
    }
  });

  const foodName = document.getElementById('foodNameInput');
  if (foodName) foodName.value = '';

  const emptyState = document.getElementById('emptyState');
  const container  = document.getElementById('resultsContainer');
  if (emptyState) emptyState.style.display = 'block';
  if (container)  container.style.display  = 'none';

  const nutrientCards = document.getElementById('nutrientCards');
  const overallCard   = document.getElementById('overallCard');
  const altSection    = document.getElementById('altSection');
  if (nutrientCards) nutrientCards.innerHTML = '';
  if (overallCard)   overallCard.innerHTML   = '';
  if (altSection)    altSection.innerHTML    = '';

  const first = document.getElementById('inp-calories');
  if (first) first.focus();
}

// ── Save to MongoDB ─────────────────────────────
// Auth is now via the httpOnly JWT cookie (see js/api.js), so we just need
// `credentials: 'include'` — no manual token handling.
async function saveToDatabase(values, ratings, score, foodName) {
  if (!Auth.isLoggedIn()) {
    console.warn('Not logged in — skipping save to database.');
    return null;
  }

  try {
    const res = await fetch('/api/nutrition-decoder/decode', {
      method:  'POST',
      credentials: 'include',
      headers: {
        'Content-Type':  'application/json'
      },
      body: JSON.stringify({
        nutrients: values,
        foodName:  foodName || 'Unknown Food'
      })
    });

    const data = await res.json();

    if (data.success) {
      console.log('✅ Saved to MongoDB. Log ID:', data.data.logId);
      return data.data.logId;
    } else {
      console.warn('⚠️ Save warning:', data.message);
      return null;
    }
  } catch (err) {
    console.warn('⚠️ Could not save to database:', err.message);
    return null;
  }
}

// ── Load History from MongoDB ───────────────────
async function loadHistory() {
  const historyEl  = document.getElementById('historyList');
  const historyBox = document.getElementById('historySection');

  if (!Auth.isLoggedIn() || !historyEl || !historyBox) return;

  try {
    const res  = await fetch('/api/nutrition-decoder/history', {
      credentials: 'include'
    });
    const data = await res.json();

    if (!data.success || data.count === 0) {
      historyBox.style.display = 'none';
      return;
    }

    historyBox.style.display = 'block';

    function scoreColor(s) {
      return s >= 70 ? '#10b981' : s >= 50 ? '#f97316' : '#ef4444';
    }

    historyEl.innerHTML = data.data.map(log => `
      <div class="nd-history-item">
        <div class="nd-history-left">
          <div class="nd-history-food">${log.foodName}</div>
          <div class="nd-history-date">
            ${new Date(log.createdAt).toLocaleDateString('en-IN', {
              day:    '2-digit',
              month:  'short',
              year:   'numeric',
              hour:   '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
        <div class="nd-history-right">
          <div class="nd-history-score"
               style="color:${scoreColor(log.overallScore)};">
            ${log.overallScore}
            <small>/100</small>
          </div>
          <button
            class="nd-history-delete"
            onclick="deleteHistoryLog('${log._id}')"
            title="Delete this scan">
            <i class="fas fa-trash-can"></i>
          </button>
        </div>
      </div>
    `).join('');

  } catch (err) {
    console.warn('Could not load history:', err.message);
    historyBox.style.display = 'none';
  }
}

// ── Delete a History Log ────────────────────────
async function deleteHistoryLog(logId) {
  if (!Auth.isLoggedIn()) return;

  const ok = await confirmDialog('Delete this scan from your history?', { confirmText: 'Delete' });
  if (!ok) return;

  try {
    const res  = await fetch(
      '/api/nutrition-decoder/history/' + logId,
      {
        method:  'DELETE',
        credentials: 'include'
      }
    );
    const data = await res.json();

    if (data.success) {
      loadHistory();
      toast('Scan deleted from history.', 'success');
    } else {
      toast('Could not delete. Please try again.', 'error');
    }
  } catch (err) {
    console.warn('Delete error:', err.message);
    toast('Could not delete. Please try again.', 'error');
  }
}

// ── Main Decode Function ────────────────────────
async function decodeLabel() {
  const btn      = document.getElementById('decodeBtn');
  const values   = {};
  const ratings  = {};
  let hasAny     = false;

  // Read and validate all inputs
  for (const [key, id] of Object.entries(INPUT_MAP)) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') continue;

    const val = parseFloat(el.value);

    // Negative number check
    if (val < 0) {
      toast(`${NUTRIENTS[key].label} cannot be negative. Please enter 0 or above.`, 'error');
      el.focus();
      el.style.borderColor = '#ef4444';
      return;
    }

    // Unrealistic calories check
    if (key === 'calories' && val > 5000) {
      toast(`Calories value ${val} seems too high for one serving. Normal range is 0–1000 kcal — please double-check.`, 'error');
      el.focus();
      el.style.borderColor = '#ef4444';
      return;
    }

    if (!isNaN(val)) {
      values[key]          = val;
      ratings[key]         = NUTRIENTS[key].rate(val);
      hasAny               = true;
      el.style.borderColor = '';
    }
  }

  // No values entered
  if (!hasAny) {
    toast('Please enter at least one nutrition value before decoding.', 'warning');
    return;
  }
  // Cross validation — added sugar cannot exceed total sugar
  if (
    values.addedSugar !== undefined &&
    values.sugar      !== undefined
  ) {
    if (values.addedSugar > values.sugar) {
      toast(`Added Sugar (${values.addedSugar}g) cannot be more than Total Sugar (${values.sugar}g). Please recheck the nutrition label.`, 'error');
      const addedEl = document.getElementById('inp-added-sugar');
      if (addedEl) {
        addedEl.focus();
        addedEl.style.borderColor = '#ef4444';
      }
      return;
    }
  }

  // Macro vs calorie warning
  if (
    values.calories !== undefined &&
    values.protein  !== undefined &&
    values.fat      !== undefined &&
    values.carbs    !== undefined
  ) {
    const estimated =
      (values.protein * 4) +
      (values.fat     * 9) +
      (values.carbs   * 4);

    if (estimated > values.calories * 1.5) {
      toast(`Your macronutrients suggest approx ${Math.round(estimated)} kcal, but you entered ${values.calories} kcal. Continuing with your entered values — verify against the label if unsure.`, 'warning', 5500);
    }
  }

  // Show loading state
  btn.disabled  = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analysing...';

  try {
    const score    = calcScore(ratings);
    const now      = new Date();
    const foodName = document.getElementById('foodNameInput')
      ? document.getElementById('foodNameInput').value.trim()
      : 'Unknown Food';

    // Save to MongoDB
    await saveToDatabase(values, ratings, score, foodName);

    // Switch panels
    const emptyState = document.getElementById('emptyState');
    const container  = document.getElementById('resultsContainer');
    if (emptyState) emptyState.style.display = 'none';
    if (container)  container.style.display  = 'block';

    // Timestamp
    const tsEl = document.getElementById('resultsTimestamp');
    if (tsEl) {
      tsEl.textContent =
        'Analysed at ' +
        now.toLocaleTimeString('en-IN', {
          hour:   '2-digit',
          minute: '2-digit'
        });
    }

    // Render all result sections
    renderOverall(score);

    const cardsEl = document.getElementById('nutrientCards');
    if (cardsEl) {
      cardsEl.innerHTML = Object.entries(values)
        .map(([k, v]) => renderNutrient(k, v))
        .join('');
    }

    renderAlternatives(ratings);
    animateBars();

    // Refresh history panel
    loadHistory();

    // Scroll to results
    if (container) {
      container.scrollIntoView({
        behavior: 'smooth',
        block:    'start'
      });
    }

  } catch (err) {
    console.error('Decode error:', err);
    toast('Something went wrong during analysis. Please try again.', 'error');
  }

  // Always re-enable button
  btn.disabled  = false;
  btn.innerHTML = '<i class="fas fa-magnifying-glass"></i> Decode Label';
}

// ── Event Listeners ─────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  // Decode button
  const decodeBtn = document.getElementById('decodeBtn');
  if (decodeBtn) {
    decodeBtn.addEventListener('click', decodeLabel);
  }

  // Clear button
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAll);
  }

  // Enter key on any input triggers decode
  // Red border resets when user starts typing
  document.querySelectorAll('.nd-input-group input')
    .forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') decodeLabel();
      });
      input.addEventListener('input', () => {
        input.style.borderColor = '';
        input.style.background  = '';
      });
    });

  // Load history from MongoDB on page open
  loadHistory();

});