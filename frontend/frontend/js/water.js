const GOAL = 3000;
let data = JSON.parse(localStorage.getItem('nutriguide_water') || '{"amount":0,"log":[]}');

function render() {
  const pct = Math.min((data.amount / GOAL) * 100, 100);
  document.getElementById('waterAmount').textContent = data.amount;
  document.getElementById('waterFill').style.width = `${pct}%`;
  document.getElementById('waterPct').textContent = `${Math.round(pct)}%`;
  document.getElementById('bottleFill').style.height = `${pct}%`;
  document.getElementById('bottleLabel').textContent = `${Math.round(pct)}%`;

  const logEl = document.getElementById('waterLog');
  if (data.log.length === 0) {
    logEl.innerHTML = '<li class="log-empty">No entries yet. Start drinking!</li>';
  } else {
    logEl.innerHTML = data.log.slice().reverse().map(entry =>
      `<li>
        <span><i class="fas fa-droplet" style="color:#64b5f6;margin-right:6px"></i>${entry.label}</span>
        <span class="log-amount">+${entry.ml} ml</span>
        <span class="log-time">${entry.time}</span>
      </li>`
    ).join('');
  }
}

function addWater(ml) {
  if (data.amount >= GOAL) {
    toast('🎉 Daily goal already reached!', 'success');
    return;
  }
  data.amount = Math.min(data.amount + ml, GOAL);
  const now = new Date();
  data.log.push({
    ml,
    label: `Glass of water`,
    time: now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
  });
  localStorage.setItem('nutriguide_water', JSON.stringify(data));
  render();
}

async function resetWater() {
  const ok = await confirmDialog('Reset today\'s water intake?', { confirmText: 'Reset' });
  if (!ok) return;
  data = { amount: 0, log: [] };
  localStorage.setItem('nutriguide_water', JSON.stringify(data));
  render();
  toast('Water intake reset.', 'success');
}

render();
