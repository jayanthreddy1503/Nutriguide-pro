// Gender + goal based weekly diet plan.
// Each goal defines calorie/water/exercise targets plus rotating meal options for
// breakfast/lunch/snack/dinner. We assign one option per weekday so all 7 days
// have a genuinely different, repeat-free combination across the week.

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const mealPlans = {
  Male: {
    'Weight Loss': {
      calories: '1800–2000 kcal', water: '3.5 L', exercise: '45–60 min/day',
      caloriesNote: 'Caloric deficit while preserving muscle mass',
      exerciseNote: 'Cardio + strength training',
      avoid: 'Avoid fried food, sugary drinks, white bread, alcohol and processed snacks.',
      breakfast: ['Oats with banana & almonds', 'Egg white omelette with veggies', 'Greek yogurt with berries', 'Boiled eggs with whole wheat toast', 'Sprouts & vegetable poha', 'Protein smoothie with spinach', 'Vegetable upma with peanuts'],
      lunch: ['Grilled chicken breast with brown rice & broccoli', 'Tuna salad with mixed greens', 'Lentil soup with whole wheat roti', 'Grilled fish with quinoa & spinach', 'Chickpea salad with olive oil dressing', 'Turkey wrap with whole wheat tortilla', 'Paneer stir-fry with brown rice'],
      snack: ['Handful of almonds', 'Apple with peanut butter', 'Greek yogurt', 'Roasted chickpeas', 'Carrot sticks with hummus', 'Protein shake', 'Orange slices'],
      dinner: ['Grilled salmon with steamed vegetables', 'Chicken & vegetable soup', 'Tofu stir-fry with broccoli', 'Grilled chicken salad', 'Lentil curry with cauliflower rice', 'Baked fish with asparagus', 'Vegetable & paneer stir-fry']
    },
    'Weight Gain': {
      calories: '2800–3200 kcal', water: '3.0 L', exercise: '45–60 min/day',
      caloriesNote: 'Caloric surplus to support muscle gain',
      exerciseNote: 'Heavy strength training, minimal cardio',
      avoid: 'Avoid empty-calorie junk food, excess cardio, diet sodas and skipping meals.',
      breakfast: ['Oats with whole milk, banana & peanut butter', 'Paneer paratha with butter', 'Egg & cheese sandwich with avocado', 'Banana smoothie with oats & nuts', 'Whole wheat pancakes with honey', 'Stuffed sweet potato with eggs', 'Granola with whole milk & nuts'],
      lunch: ['Chicken breast with brown rice & avocado', 'Beef/lentil stir-fry with whole grain bread', 'Salmon with sweet potato & olive oil', 'Rajma rice with ghee', 'Grilled chicken with pasta & cheese', 'Paneer butter masala with roti', 'Tuna pasta with olive oil'],
      snack: ['Peanut butter banana toast', 'Trail mix with nuts & dried fruit', 'Whole milk with dates', 'Protein shake with oats', 'Cheese & whole grain crackers', 'Greek yogurt with granola', 'Boiled eggs with avocado'],
      dinner: ['Grilled steak/chicken with mashed sweet potato', 'Salmon with quinoa & avocado', 'Paneer/tofu curry with rice', 'Chicken alfredo pasta', 'Bean & cheese burrito bowl', 'Lamb/chicken curry with naan', 'Stir-fried noodles with chicken & nuts']
    },
    'Maintain Weight': {
      calories: '2400–2600 kcal', water: '3.0 L', exercise: '30–40 min/day',
      caloriesNote: 'Balanced intake for steady maintenance',
      exerciseNote: 'Mix of cardio and strength training',
      avoid: 'Limit added sugar, trans fats, oversized portions and sugary drinks.',
      breakfast: ['Oats with fruit & nuts', 'Vegetable omelette with toast', 'Greek yogurt with granola', 'Idli/dosa with sambar', 'Peanut butter banana toast', 'Smoothie bowl with seeds', 'Whole grain cereal with milk'],
      lunch: ['Grilled chicken with brown rice & salad', 'Fish curry with roti', 'Chickpea & veggie bowl', 'Turkey sandwich with side salad', 'Paneer tikka with quinoa', 'Lentil soup with whole grain bread', 'Vegetable biryani with raita'],
      snack: ['Mixed nuts', 'Fruit bowl', 'Roasted makhana', 'Hummus with veggie sticks', 'Buttermilk', 'Protein bar', 'Boiled corn'],
      dinner: ['Grilled fish with vegetables', 'Chicken stir-fry with brown rice', 'Vegetable curry with roti', 'Paneer salad bowl', 'Soup with whole grain bread', 'Tofu & vegetable stir-fry', 'Grilled chicken with steamed greens']
    }
  },
  Female: {
    'Weight Loss': {
      calories: '1400–1600 kcal', water: '3.0 L', exercise: '40–50 min/day',
      caloriesNote: 'Gentle caloric deficit for gradual, sustainable loss',
      exerciseNote: 'Cardio + light strength training',
      avoid: 'Avoid fried food, sugary drinks, white bread, candy and alcohol.',
      breakfast: ['Greek yogurt with berries & chia seeds', 'Vegetable egg white omelette', 'Oats with apple & cinnamon', 'Smoothie with spinach & banana', 'Sprouts salad', 'Idli with sambar', 'Boiled eggs with cucumber slices'],
      lunch: ['Grilled chicken salad with olive oil dressing', 'Lentil soup with side salad', 'Quinoa bowl with chickpeas & veggies', 'Grilled fish with steamed broccoli', 'Paneer salad with greens', 'Vegetable soup with whole wheat roti', 'Tuna salad lettuce wraps'],
      snack: ['Apple slices with almond butter', 'Greek yogurt', 'Carrot & cucumber sticks', 'Handful of walnuts', 'Roasted chickpeas', 'Berries', 'Herbal tea with a small fruit'],
      dinner: ['Grilled fish with steamed vegetables', 'Vegetable & tofu stir-fry', 'Chicken breast with sautéed greens', 'Lentil curry with cauliflower rice', 'Vegetable clear soup with salad', 'Paneer & spinach stir-fry', 'Grilled shrimp/paneer with zucchini']
    },
    'Weight Gain': {
      calories: '2200–2500 kcal', water: '2.8 L', exercise: '40–50 min/day',
      caloriesNote: 'Moderate caloric surplus for healthy weight & muscle gain',
      exerciseNote: 'Strength training focus, light cardio',
      avoid: 'Avoid empty-calorie junk food, skipping meals and excessive cardio.',
      breakfast: ['Oats with whole milk, banana & nuts', 'Paneer stuffed paratha', 'Peanut butter banana toast', 'Egg & avocado sandwich', 'Smoothie with milk, oats & dates', 'Granola with whole milk', 'Sweet potato & egg bowl'],
      lunch: ['Paneer butter masala with rice', 'Chicken with brown rice & avocado', 'Rajma rice with ghee', 'Salmon with sweet potato', 'Pasta with olive oil & cheese', 'Chickpea curry with roti & ghee', 'Grilled chicken with quinoa'],
      snack: ['Trail mix with nuts & dried fruit', 'Cheese & whole grain crackers', 'Banana with peanut butter', 'Whole milk with dates', 'Greek yogurt with granola', 'Protein smoothie', 'Hummus with pita'],
      dinner: ['Paneer/tofu curry with rice', 'Salmon with quinoa & avocado', 'Chicken alfredo pasta', 'Bean & cheese bowl', 'Lamb/chicken curry with naan', 'Vegetable korma with rice', 'Stir-fried noodles with paneer & nuts']
    },
    'Maintain Weight': {
      calories: '1900–2100 kcal', water: '2.8 L', exercise: '30–40 min/day',
      caloriesNote: 'Balanced intake for steady maintenance',
      exerciseNote: 'Mix of cardio, yoga and strength training',
      avoid: 'Limit added sugar, trans fats, oversized portions and sugary drinks.',
      breakfast: ['Oats with fruit & seeds', 'Vegetable omelette with toast', 'Greek yogurt with granola', 'Idli/dosa with sambar', 'Peanut butter banana toast', 'Smoothie bowl with nuts', 'Whole grain cereal with milk'],
      lunch: ['Grilled chicken with quinoa & salad', 'Fish curry with roti', 'Chickpea & veggie bowl', 'Paneer tikka with brown rice', 'Lentil soup with whole grain bread', 'Vegetable biryani with raita', 'Turkey/paneer sandwich with salad'],
      snack: ['Mixed nuts', 'Fruit bowl', 'Roasted makhana', 'Hummus with veggie sticks', 'Buttermilk', 'Protein bar', 'Herbal tea with berries'],
      dinner: ['Grilled fish with vegetables', 'Vegetable curry with roti', 'Paneer salad bowl', 'Chicken stir-fry with brown rice', 'Soup with whole grain bread', 'Tofu & vegetable stir-fry', 'Grilled chicken with steamed greens']
    }
  }
};

const profile = JSON.parse(localStorage.getItem('nutriguide_profile') || '{}');
const goal = profile.goal || '';
const genderRaw = (profile.gender || '').trim();
const gender = (genderRaw === 'Male' || genderRaw === 'Female') ? genderRaw : 'Male'; // sensible default for 'Other'/unset

document.getElementById('goalTitle').textContent = goal
  ? `${goal} — ${genderRaw || 'General'} Plan`
  : 'No goal set — please update your profile.';

let activeDay = 0;

function renderMealGrid(plan, dayIndex) {
  const meals = [
    { label: 'Breakfast', icon: 'fa-mug-saucer', text: plan.breakfast[dayIndex] },
    { label: 'Lunch', icon: 'fa-bowl-food', text: plan.lunch[dayIndex] },
    { label: 'Snack', icon: 'fa-apple-whole', text: plan.snack[dayIndex] },
    { label: 'Dinner', icon: 'fa-utensils', text: plan.dinner[dayIndex] },
  ];
  document.getElementById('mealGrid').innerHTML = meals.map(m => `
    <div class="meal-card">
      <div class="meal-label"><i class="fas ${m.icon}"></i> ${m.label}</div>
      <p>${m.text}</p>
    </div>
  `).join('');
}

function renderDayTabs(plan) {
  document.getElementById('dayTabs').innerHTML = DAYS.map((d, i) => `
    <button class="day-tab ${i === activeDay ? 'active' : ''}" onclick="selectDay(${i})">${d.slice(0, 3)}</button>
  `).join('');
}

function selectDay(i) {
  activeDay = i;
  const plan = mealPlans[gender][goal];
  renderDayTabs(plan);
  renderMealGrid(plan, i);
}

if (goal && mealPlans[gender] && mealPlans[gender][goal]) {
  const p = mealPlans[gender][goal];

  document.getElementById('calories').textContent = p.calories;
  document.getElementById('caloriesNote').textContent = p.caloriesNote;
  document.getElementById('water').textContent = p.water;
  document.getElementById('exercise').textContent = p.exercise;
  document.getElementById('exerciseNote').textContent = p.exerciseNote;
  document.getElementById('planSubtitle').textContent = `${gender} · ${goal} · tap a day to view its meals`;
  document.getElementById('avoidNote').textContent = `⚠️ ${p.avoid}`;

  renderDayTabs(p);
  renderMealGrid(p, activeDay);
} else {
  document.getElementById('calories').textContent = 'Set a goal first';
  document.getElementById('water').textContent = '2.5–3.0 L';
  document.getElementById('exercise').textContent = '30 min/day';
  document.getElementById('planSubtitle').textContent = 'Complete your profile to unlock your personalized 7-day plan.';
  document.getElementById('dayTabs').innerHTML = '';
  document.getElementById('mealGrid').innerHTML = '<p style="color:var(--muted)">Set your gender and goal in your <a href="profile.html">Profile</a> to see your weekly plan.</p>';
}
