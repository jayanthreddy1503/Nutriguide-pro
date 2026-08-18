// Calories per 100g: { cal, protein, carbs, fat }
const foodDB = {
  egg:           { label: 'Egg (whole)',           cal: 155, protein: 13.0, carbs: 1.1,  fat: 11.0 },
  chicken_breast:{ label: 'Chicken Breast',        cal: 165, protein: 31.0, carbs: 0.0,  fat: 3.6  },
  salmon:        { label: 'Salmon',                cal: 208, protein: 20.0, carbs: 0.0,  fat: 13.0 },
  tuna:          { label: 'Tuna',                  cal: 132, protein: 28.0, carbs: 0.0,  fat: 1.0  },
  paneer:        { label: 'Paneer',                cal: 265, protein: 18.3, carbs: 1.2,  fat: 20.8 },
  tofu:          { label: 'Tofu',                  cal: 76,  protein: 8.0,  carbs: 1.9,  fat: 4.8  },
  white_rice:    { label: 'White Rice (cooked)',   cal: 130, protein: 2.7,  carbs: 28.0, fat: 0.3  },
  brown_rice:    { label: 'Brown Rice (cooked)',   cal: 112, protein: 2.6,  carbs: 23.5, fat: 0.9  },
  oats:          { label: 'Oats (dry)',            cal: 389, protein: 17.0, carbs: 66.0, fat: 7.0  },
  bread_white:   { label: 'White Bread',           cal: 265, protein: 9.0,  carbs: 49.0, fat: 3.2  },
  bread_wheat:   { label: 'Whole Wheat Bread',     cal: 247, protein: 13.0, carbs: 41.0, fat: 4.2  },
  pasta:         { label: 'Pasta (cooked)',        cal: 131, protein: 5.0,  carbs: 25.0, fat: 1.1  },
  roti:          { label: 'Roti / Chapati',        cal: 297, protein: 9.0,  carbs: 57.0, fat: 4.5  },
  banana:        { label: 'Banana',               cal: 89,  protein: 1.1,  carbs: 23.0, fat: 0.3  },
  apple:         { label: 'Apple',                cal: 52,  protein: 0.3,  carbs: 14.0, fat: 0.2  },
  mango:         { label: 'Mango',                cal: 60,  protein: 0.8,  carbs: 15.0, fat: 0.4  },
  orange:        { label: 'Orange',               cal: 47,  protein: 0.9,  carbs: 12.0, fat: 0.1  },
  grapes:        { label: 'Grapes',               cal: 67,  protein: 0.6,  carbs: 17.0, fat: 0.4  },
  carrot:        { label: 'Carrot',               cal: 41,  protein: 0.9,  carbs: 10.0, fat: 0.2  },
  spinach:       { label: 'Spinach',              cal: 23,  protein: 2.9,  carbs: 3.6,  fat: 0.4  },
  broccoli:      { label: 'Broccoli',             cal: 34,  protein: 2.8,  carbs: 7.0,  fat: 0.4  },
  potato:        { label: 'Potato (boiled)',      cal: 86,  protein: 1.9,  carbs: 20.0, fat: 0.1  },
  tomato:        { label: 'Tomato',               cal: 18,  protein: 0.9,  carbs: 3.9,  fat: 0.2  },
  onion:         { label: 'Onion',                cal: 40,  protein: 1.1,  carbs: 9.3,  fat: 0.1  },
  milk:          { label: 'Milk (whole)',          cal: 61,  protein: 3.2,  carbs: 4.8,  fat: 3.3  },
  curd:          { label: 'Curd / Yogurt',        cal: 59,  protein: 3.5,  carbs: 4.7,  fat: 3.3  },
  cheese:        { label: 'Cheese',               cal: 402, protein: 25.0, carbs: 1.3,  fat: 33.0 },
  butter:        { label: 'Butter',               cal: 717, protein: 0.9,  carbs: 0.1,  fat: 81.0 },
  almonds:       { label: 'Almonds',              cal: 579, protein: 21.0, carbs: 22.0, fat: 50.0 },
  peanuts:       { label: 'Peanuts',              cal: 567, protein: 26.0, carbs: 16.0, fat: 49.0 },
  avocado:       { label: 'Avocado',              cal: 160, protein: 2.0,  carbs: 9.0,  fat: 15.0 },
  olive_oil:     { label: 'Olive Oil',            cal: 884, protein: 0.0,  carbs: 0.0,  fat: 100.0},
  coconut_oil:   { label: 'Coconut Oil',          cal: 862, protein: 0.0,  carbs: 0.0,  fat: 100.0},
  lentils:       { label: 'Lentils (cooked)',     cal: 116, protein: 9.0,  carbs: 20.0, fat: 0.4  },
  chickpeas:     { label: 'Chickpeas (cooked)',   cal: 164, protein: 9.0,  carbs: 27.0, fat: 2.6  },
  kidney_beans:  { label: 'Kidney Beans',         cal: 127, protein: 8.7,  carbs: 22.8, fat: 0.5  },
};

let foodLog = [];

function addFoodItem() {
  const foodKey = document.getElementById('foodName').value;
  const weight  = parseFloat(document.getElementById('foodWeight').value);

  if (!foodKey) { alert('Please select a food.'); return; }
  if (!weight || weight <= 0) { alert('Please enter a valid weight in grams.'); return; }

  const food = foodDB[foodKey];
  const factor = weight / 100;

  foodLog.push({
    key: foodKey,
    label: food.label,
    weight,
    cal:     +(food.cal     * factor).toFixed(1),
    protein: +(food.protein * factor).toFixed(1),
    carbs:   +(food.carbs   * factor).toFixed(1),
    fat:     +(food.fat     * factor).toFixed(1),
  });

  document.getElementById('foodName').value = '';
  document.getElementById('foodWeight').value = '';
  renderLog();
}

function removeItem(index) {
  foodLog.splice(index, 1);
  renderLog();
}

function clearAll() {
  if (foodLog.length === 0) return;
  if (!confirm('Clear all food items?')) return;
  foodLog = [];
  renderLog();
}

function renderLog() {
  const totalCal     = foodLog.reduce((s, f) => s + f.cal,     0);
  const totalProtein = foodLog.reduce((s, f) => s + f.protein, 0);
  const totalCarbs   = foodLog.reduce((s, f) => s + f.carbs,   0);
  const totalFat     = foodLog.reduce((s, f) => s + f.fat,     0);

  document.getElementById('totalCal').textContent     = totalCal.toFixed(0);
  document.getElementById('totalProtein').textContent = totalProtein.toFixed(1) + 'g';
  document.getElementById('totalCarbs').textContent   = totalCarbs.toFixed(1)   + 'g';
  document.getElementById('totalFat').textContent     = totalFat.toFixed(1)     + 'g';

  // Goal bar
  const goal = parseFloat(document.getElementById('dailyGoal').value);
  const wrap = document.getElementById('goalProgressWrap');
  if (goal > 0) {
    wrap.style.display = 'block';
    const pct = Math.min((totalCal / goal) * 100, 100);
    const over = totalCal > goal;
    document.getElementById('goalProgressText').textContent = `${totalCal.toFixed(0)} / ${goal} kcal`;
    document.getElementById('goalProgressPct').textContent  = `${((totalCal/goal)*100).toFixed(0)}%`;
    const fill = document.getElementById('goalBarFill');
    fill.style.width = `${pct}%`;
    fill.className = over ? 'goal-bar-fill over' : 'goal-bar-fill';
    const statusEl = document.getElementById('goalStatus');
    if (over) {
      const excess = (totalCal - goal).toFixed(0);
      statusEl.textContent = `⚠️ ${excess} kcal over your daily goal`;
      statusEl.className = 'goal-status over';
    } else {
      const remaining = (goal - totalCal).toFixed(0);
      statusEl.textContent = `✅ ${remaining} kcal remaining today`;
      statusEl.className = 'goal-status';
    }
  } else {
    wrap.style.display = 'none';
  }

  // Table
  const empty = document.getElementById('emptyLog');
  const table = document.getElementById('foodTable');
  if (foodLog.length === 0) {
    empty.style.display = 'block';
    table.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  table.style.display = 'table';

  document.getElementById('foodTableBody').innerHTML = foodLog.map((f, i) => `
    <tr>
      <td>${f.label}</td>
      <td>${f.weight}g</td>
      <td class="td-cal">${f.cal} kcal</td>
      <td>${f.protein}g</td>
      <td>${f.carbs}g</td>
      <td>${f.fat}g</td>
      <td><button class="del-btn" onclick="removeItem(${i})"><i class="fas fa-times"></i></button></td>
    </tr>
  `).join('');
}

// Re-render goal bar when goal changes
document.getElementById('dailyGoal').addEventListener('input', renderLog);

// ----- AI Food Identifier -----
// Sends a free-text description to the backend, which uses the Claude API
// (or a local fuzzy-match fallback if no API key is configured) to identify
// food items and estimate their calories/macros, then adds them straight to the log.
async function identifyFoodWithAI() {
  const input = document.getElementById('aiDescription');
  const description = input.value.trim();
  const msg = document.getElementById('aiMsg');
  const btn = document.getElementById('aiIdentifyBtn');

  msg.classList.add('hidden');
  msg.classList.remove('error');

  if (!description) {
    msg.textContent = 'Please describe what you ate first.';
    msg.classList.remove('hidden');
    msg.classList.add('error');
    return;
  }

  btn.disabled = true;
  const originalHtml = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Identifying...';

  try {
    const data = await apiRequest('/ai/identify-food', {
      method: 'POST',
      body: { description }
    });

    data.items.forEach(item => {
      foodLog.push({
        key: 'ai_' + Date.now() + Math.random(),
        label: item.name,
        weight: item.estimatedWeightGrams,
        cal: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        fat: item.fat,
      });
    });

    renderLog();
    input.value = '';
    msg.textContent = `✅ Added ${data.items.length} item${data.items.length > 1 ? 's' : ''} (${data.source === 'ai' ? 'AI-identified' : 'matched from food database'}).`;
    msg.classList.remove('hidden');

  } catch (err) {
    msg.textContent = err.message;
    msg.classList.remove('hidden');
    msg.classList.add('error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalHtml;
  }
}
