// Unit toggle state (declared first to avoid TDZ errors)
let currentUnit = 'cm';

// Pre-fill from profile
const profile = JSON.parse(localStorage.getItem('nutriguide_profile') || '{}');
if (profile.height) document.getElementById('heightCm').value = profile.height;
if (profile.weight) document.getElementById('weightInput').value = profile.weight;
if (profile.age)    document.getElementById('ageInput').value = profile.age;
if (profile.gender) document.getElementById('genderInput').value = profile.gender.toLowerCase();
if (profile.height && profile.weight) calculateBMI();

// Unit toggle
function switchUnit(unit) {
  currentUnit = unit;
  document.getElementById('cmInput').style.display = unit === 'cm' ? 'block' : 'none';
  document.getElementById('ftInput').style.display  = unit === 'ft' ? 'block' : 'none';
  document.getElementById('btnCm').classList.toggle('active', unit === 'cm');
  document.getElementById('btnFt').classList.toggle('active', unit === 'ft');
}

function getHeightCm() {
  if (currentUnit === 'cm') {
    return parseFloat(document.getElementById('heightCm').value) || 0;
  } else {
    const ft = parseFloat(document.getElementById('heightFt').value) || 0;
    const inch = parseFloat(document.getElementById('heightIn').value) || 0;
    return (ft * 30.48) + (inch * 2.54);
  }
}

function getHeightDisplay() {
  if (currentUnit === 'cm') {
    return document.getElementById('heightCm').value + ' cm';
  } else {
    const ft = document.getElementById('heightFt').value || '0';
    const inch = document.getElementById('heightIn').value || '0';
    return `${ft}ft ${inch}in`;
  }
}

function calculateBMI() {
  const height = getHeightCm();
  const weight = parseFloat(document.getElementById('weightInput').value);
  const age    = parseInt(document.getElementById('ageInput').value) || 0;
  const gender = document.getElementById('genderInput').value;

  if (!height || !weight || height <= 0 || weight <= 0) {
    toast('Please enter valid height and weight.', 'warning'); return;
  }

  const h = height / 100;
  let bmi = parseFloat((weight / (h * h)).toFixed(1));

  // Small adjustment for gender/age (clinical standard adjustments)
  // Women tend to have slightly higher body fat at same BMI
  // Ages 65+ BMI thresholds shift slightly
  let adjustedNote = '';
  if (gender === 'female') {
    adjustedNote = '(adjusted for female body composition)';
  }
  if (age >= 65) {
    adjustedNote += age >= 65 ? ' — For age 65+, a BMI of 25–27 may be healthier.' : '';
  }

  let category, catClass, tip, color, pct;
  if (bmi < 18.5) {
    category = 'Underweight'; catClass = 'cat-underweight'; color = '#1976d2';
    tip = 'You may need to increase your calorie intake. Consider a weight gain plan.';
    pct = (bmi / 18.5) * 25;
  } else if (bmi < 25) {
    category = 'Normal Weight'; catClass = 'cat-normal'; color = '#2d9e6b';
    tip = 'Great! Your BMI is in the healthy range. Keep maintaining your habits.';
    pct = 25 + ((bmi - 18.5) / 6.5) * 25;
  } else if (bmi < 30) {
    category = 'Overweight'; catClass = 'cat-overweight'; color = '#e67e22';
    tip = 'Consider adopting a balanced diet and regular exercise routine.';
    pct = 50 + ((bmi - 25) / 5) * 25;
  } else {
    category = 'Obese'; catClass = 'cat-obese'; color = '#c62828';
    tip = 'Please consult a healthcare provider for a personalised weight management plan.';
    pct = 75 + Math.min(((bmi - 30) / 10) * 25, 24);
  }

  document.getElementById('bmiResult').textContent = bmi;
  const catEl = document.getElementById('bmiCategory');
  catEl.textContent = category;
  catEl.className = `bmi-category ${catClass}`;
  document.getElementById('bmiTip').textContent = tip + (adjustedNote ? ' ' + adjustedNote : '');
  document.getElementById('resHeight').textContent = getHeightDisplay();
  document.getElementById('resWeight').textContent = weight + ' kg';
  document.getElementById('resAge').textContent = age || '--';
  document.getElementById('resGender').textContent = gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : '--';

  // Ideal weight range (Devine formula)
  const idealLow  = +(18.5 * h * h).toFixed(1);
  const idealHigh = +(24.9 * h * h).toFixed(1);
  const idealBox  = document.getElementById('idealWeightBox');
  idealBox.style.display = 'flex';
  document.getElementById('idealWeightText').textContent = `${idealLow} kg – ${idealHigh} kg`;

  // Animate ring
  const ring = document.getElementById('bmiRing');
  ring.style.stroke = color;
  ring.style.transition = 'stroke-dashoffset .8s cubic-bezier(.4,0,.2,1), stroke .3s';
  ring.style.strokeDashoffset = 345 - 345 * Math.min(pct / 100, 1);

  document.getElementById('bmiPointer').style.left = `${Math.min(pct, 99)}%`;
}
