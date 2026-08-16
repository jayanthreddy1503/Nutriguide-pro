const profile = JSON.parse(localStorage.getItem('nutriguide_profile') || '{}');
const waterData = JSON.parse(localStorage.getItem('nutriguide_water') || '{"amount":0}');

let score = 0;
let tips = [];

// BMI score
let bmiScore = 0, bmiLabel = 'No data', bmiFillPct = 0;
if (profile.weight && profile.height) {
  const h = profile.height / 100;
  const bmi = profile.weight / (h * h);
  if (bmi >= 18.5 && bmi < 25) { bmiLabel = 'Normal'; bmiScore = 30; bmiFillPct = 100; }
  else if (bmi >= 25 && bmi < 30) { bmiLabel = 'Overweight'; bmiScore = 18; bmiFillPct = 60; }
  else if (bmi < 18.5) { bmiLabel = 'Underweight'; bmiScore = 15; bmiFillPct = 50; }
  else { bmiLabel = 'Obese'; bmiScore = 8; bmiFillPct = 25; tips.push('Consider a weight management plan.'); }
} else { tips.push('Complete your profile for BMI analysis.'); }

// Water score
let waterScore = 0, waterLabel = 'No data', waterFillPct = 0;
const wPct = waterData.amount / 3000;
if (wPct >= 1) { waterLabel = 'Excellent'; waterScore = 30; waterFillPct = 100; }
else if (wPct >= 0.6) { waterLabel = 'Good'; waterScore = 20; waterFillPct = 70; tips.push('Drink more water to reach your goal.'); }
else if (wPct > 0) { waterLabel = 'Low'; waterScore = 10; waterFillPct = 35; tips.push('Hydration is low. Log water regularly.'); }
else { tips.push('Start tracking your water intake today.'); }

// Goal score
let goalScore = 0, goalLabel = 'Not Set', goalFillPct = 0;
if (profile.goal) { goalLabel = profile.goal; goalScore = 20; goalFillPct = 100; }
else { tips.push('Set a health goal in your profile.'); }

// Nutrition score
let nutritionScore = 10, nutritionLabel = 'Basic', nutritionFillPct = 40;

score = bmiScore + waterScore + goalScore + nutritionScore;

// Animate ring
const ring = document.getElementById('hsRing');
ring.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)';
ring.style.strokeDashoffset = 502 - (502 * score / 100);

document.getElementById('hsScore').textContent = score;

let label = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Work';
document.getElementById('hsLabel').textContent = label;

// Fill breakdown bars
setTimeout(() => {
  document.getElementById('bmiFill').style.width = `${bmiFillPct}%`;
  document.getElementById('waterFill').style.width = `${waterFillPct}%`;
  document.getElementById('goalFill').style.width = `${goalFillPct}%`;
  document.getElementById('nutritionFill').style.width = `${nutritionFillPct}%`;
}, 300);

document.getElementById('bmiStatus').textContent = bmiLabel;
document.getElementById('waterStatus').textContent = waterLabel;
document.getElementById('goalStatus').textContent = goalLabel;
document.getElementById('nutritionStatus').textContent = nutritionLabel;

if (tips.length) {
  document.getElementById('scoreTip').textContent = '💡 ' + tips[0];
} else {
  document.getElementById('scoreTip').textContent = '✅ You\'re doing great! Keep it up.';
}
