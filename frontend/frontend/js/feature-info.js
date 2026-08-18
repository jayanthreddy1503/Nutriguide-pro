const features = {
  bmi: {
    icon: '⚖️', tag: 'Body Measurement',
    title: 'BMI Calculator',
    what: `Body Mass Index (BMI) is a measurement that uses your height and weight to estimate whether you are underweight, normal weight, overweight, or obese. NutriGuide's BMI calculator also accounts for your age and gender to give a more accurate picture of your body composition.`,
    how: [
      'Enter your age, gender, height (in cm or feet & inches), and weight in kg.',
      'The calculator uses the formula: BMI = weight (kg) ÷ height² (m).',
      'Gender and age adjustments are applied — women naturally carry more body fat at the same BMI.',
      'Your result is plotted on a colour-coded scale: Underweight, Normal, Overweight, or Obese.',
      'Your ideal healthy weight range is calculated and shown based on your height.'
    ],
    benefits: [
      'Gives a quick overview of your weight status without medical equipment.',
      'Helps identify health risks associated with being underweight or overweight.',
      'Provides a personalised ideal weight range to work toward.',
      'Supports goal-setting for weight loss, gain or maintenance plans.',
      'Tracks changes in your body composition over time when used regularly.'
    ],
    facts: [
      ['Normal BMI', '18.5 – 24.9'],
      ['Overweight', '25 – 29.9'],
      ['Obese', '≥ 30'],
      ['Underweight', '< 18.5'],
      ['Unit support', 'cm & ft/in']
    ],
    link: 'bmi.html'
  },
  water: {
    icon: '💧', tag: 'Hydration',
    title: 'Water Tracker',
    what: `Water makes up about 60% of the human body. Staying properly hydrated improves energy, digestion, skin health, and brain function. The NutriGuide Water Tracker helps you log every glass you drink and stay on track with your daily goal of 3 litres.`,
    how: [
      'Click "+250 ml" or "+500 ml" to log each glass or bottle of water you drink.',
      'The animated bottle fills up as you log more water throughout the day.',
      'A progress bar shows your percentage toward the 3 litre daily goal.',
      'Every entry is time-stamped and shown in your daily log.',
      'Hit Reset each morning to start tracking a fresh new day.'
    ],
    benefits: [
      'Prevents dehydration which causes fatigue, headaches and poor concentration.',
      'Supports healthy digestion and prevents constipation.',
      'Improves skin clarity, elasticity and hydration.',
      'Boosts metabolism and helps the body burn calories more efficiently.',
      'Reduces false hunger signals — often thirst is mistaken for hunger.'
    ],
    facts: [
      ['Daily Goal', '3,000 ml'],
      ['Increment Options', '250ml / 500ml'],
      ['Logged per', 'Day (resets)'],
      ['Body is water', '~60%'],
      ['Dehydration starts at', '1–2% loss']
    ],
    link: 'water.html'
  },
  nutrition: {
    icon: '🥗', tag: 'Deficiency Analysis',
    title: 'Nutrition Analysis',
    what: `Poor nutrition leads to deficiencies that show up as symptoms — fatigue, hair fall, dry skin, poor vision and more. NutriGuide's Nutrition Analyser lets you select your symptom and immediately see which nutrients you are likely lacking and which specific foods will help fix it.`,
    how: [
      'Open the Nutrition section and select your current symptom from the dropdown.',
      'Click Analyze to instantly see what nutrient deficiency likely causes it.',
      'View the specific nutrient pills — each one you need more of.',
      'See a curated list of 8 whole foods that are rich in those nutrients.',
      'Add those foods to your daily meals or use the Recipe section to cook them.'
    ],
    benefits: [
      'Identifies the root nutritional cause of common health symptoms.',
      'Saves time researching — get targeted food advice in seconds.',
      'Covers 17 symptoms from fatigue to acne, bloating to anxiety.',
      'Encourages whole-food solutions instead of unnecessary supplements.',
      'Educates you on the link between diet and how your body feels daily.'
    ],
    facts: [
      ['Symptoms covered', '17'],
      ['Foods per symptom', '8 foods'],
      ['Nutrient tags shown', 'Yes'],
      ['Evidence-based', 'Yes'],
      ['Supplement advice', 'No — food first']
    ],
    link: 'nutrition.html'
  },
  recipes: {
    icon: '🍳', tag: 'Healthy Eating',
    title: 'Healthy Recipes',
    what: `Knowing what to eat is only half the battle — knowing how to cook it makes all the difference. NutriGuide's Healthy Recipes section gives you easy, nutritious recipes for 12 key health foods including eggs, chicken, salmon, oats, spinach and more, complete with exact ingredient quantities and step-by-step instructions.`,
    how: [
      'Go to the Healthy Recipes page and browse the food image grid.',
      'Click any food (egg, carrot, banana, etc.) to open its recipe panel.',
      'Each recipe shows exact ingredients with quantities (e.g. Eggs: 2 whole, Oil: 5 ml).',
      'Follow the numbered step-by-step cooking instructions.',
      'Each recipe also shows total calories, prep time and servings.'
    ],
    benefits: [
      'Makes healthy eating practical, not just theoretical.',
      'Exact quantities prevent overeating or under-nutrition.',
      'Quick recipes (5–30 min) fit into any schedule.',
      'Calorie information helps with daily food planning.',
      'Tied directly to the Nutrition section — cook what your body needs.'
    ],
    facts: [
      ['Foods available', '12'],
      ['Recipes total', '20+'],
      ['Shortest recipe', '5 minutes'],
      ['Ingredients per recipe', '5–7'],
      ['Calories shown', 'Yes per recipe']
    ],
    link: 'recipes.html'
  },
  exercises: {
    icon: '💪', tag: 'Fitness',
    title: 'Exercise Library',
    what: `Exercise is essential for weight management, muscle building, bone health and mental wellbeing. NutriGuide's Exercise Library organises workouts by body part — chest, arms, legs, back, shoulders, abs, cardio and full body — with full how-to instructions, sets, reps, rest times and calorie burn estimates.`,
    how: [
      'Open the Exercise Library and click any body part image (arms, legs, chest, etc.).',
      'View all exercises for that body part with difficulty level and goal tags.',
      'Each exercise shows a 5-step "How To Do It" guide with clear instructions.',
      'See exact sets, reps, rest time and calories burned per set.',
      'The dashboard also shows goal-specific exercises based on your profile.'
    ],
    benefits: [
      'No gym needed — all exercises are bodyweight-friendly.',
      'Organised by body part so you can target specific areas.',
      'Suitable for all levels — Beginner to Advanced exercises included.',
      'Goal-tagged exercises match your weight loss, gain or maintain goal.',
      'Step-by-step instructions reduce injury risk and improve form.'
    ],
    facts: [
      ['Body parts covered', '8'],
      ['Total exercises', '25+'],
      ['Equipment needed', 'None (bodyweight)'],
      ['Levels', 'Beginner / Intermediate / Advanced'],
      ['Calories shown', 'Per set estimate']
    ],
    link: 'exercises.html'
  },
  calories: {
    icon: '🔥', tag: 'Food Tracking',
    title: 'Calorie Calculator',
    what: `Understanding exactly how many calories are in what you eat is one of the most powerful tools for weight management. NutriGuide's Calorie Calculator lets you search from 35+ common foods, enter the weight in grams, and instantly see the calories, protein, carbohydrates and fat content — tracked in a running daily log.`,
    how: [
      'Select a food from the dropdown — organised by Proteins, Grains, Fruits, Vegetables, Dairy, Fats and Legumes.',
      'Enter the weight in grams (e.g. 150g of chicken breast).',
      'Click Add — the food is added to your daily log with its nutritional breakdown.',
      'Optionally enter your daily calorie goal to see a progress bar.',
      'Remove items individually or clear the full log anytime.'
    ],
    benefits: [
      'Tracks calories, protein, carbs and fat — the four key macronutrients.',
      'Covers 35+ Indian and international foods for realistic daily use.',
      'Visual goal bar shows if you are under or over your calorie target.',
      'Helps identify high-calorie foods that may be sabotaging your goal.',
      'Supports both weight loss (deficit) and weight gain (surplus) strategies.'
    ],
    facts: [
      ['Foods in database', '35+'],
      ['Macros tracked', 'Cal, Protein, Carbs, Fat'],
      ['Input unit', 'Grams'],
      ['Goal progress bar', 'Yes'],
      ['Indian foods included', 'Roti, Paneer, Dal, Rice']
    ],
    link: 'calorie-calc.html'
  },
  progress: {
    icon: '📈', tag: 'Tracking',
    title: 'Progress Tracker',
    what: `Seeing your progress over time is the most motivating thing in any health journey. NutriGuide's Progress Tracker lets you log your weight daily, view a live animated graph of your weight history, and see how far you've come toward your goal — whether that's weight loss, gain or maintenance.`,
    how: [
      'Set your goal (Weight Loss / Gain / Maintain) in the Profile page.',
      'Go to Progress Tracker and enter your current weight to log it.',
      'Your weight is added to a history list with the date and change indicator.',
      'A progress bar shows how far you\'ve come toward your goal target.',
      'Once you have 2+ entries, a live Chart.js line graph appears showing your journey.'
    ],
    benefits: [
      'Visual graphs are far more motivating than plain numbers.',
      'Up/down indicators (▲▼) show your daily trend at a glance.',
      'Goal-based progress bar gives a clear sense of achievement.',
      'Regular logging builds the habit of body awareness.',
      'Data connects to your Health Score for a complete wellness picture.'
    ],
    facts: [
      ['Chart type', 'Line graph'],
      ['Goal types', '3 (Loss/Gain/Maintain)'],
      ['Data stored', 'Locally on device'],
      ['Graph appears', 'After 2+ entries'],
      ['Stat cards shown', '4 (Weight, Goal, BMI, Score)']
    ],
    link: 'progess.html'
  },
  healthscore: {
    icon: '❤️', tag: 'Wellness',
    title: 'Health Score',
    what: `The NutriGuide Health Score is a single number out of 100 that summarises your overall wellness based on four key factors: your BMI status, your daily water intake, whether you've set a health goal, and your nutrition tracking activity. It gives you a quick at-a-glance view of how healthy your lifestyle currently is.`,
    how: [
      'Complete your Profile (height, weight, goal) to enable BMI scoring.',
      'Log your water intake daily to contribute to the hydration score.',
      'The score is calculated automatically each time you open the page.',
      'Four animated progress bars show your score in each category.',
      'The animated ring fills up to reflect your total score out of 100.'
    ],
    benefits: [
      'Simplifies complex health data into one easy-to-understand number.',
      'Identifies your weakest health area so you know what to improve.',
      'Motivates action — seeing a low score encourages better habits.',
      'Updates automatically as you improve your water, BMI, and goal data.',
      'Links to quick action buttons for each health area.'
    ],
    facts: [
      ['Score out of', '100'],
      ['Categories', '4 (BMI, Water, Goal, Nutrition)'],
      ['BMI max score', '30 points'],
      ['Water max score', '30 points'],
      ['Updates', 'Automatically']
    ],
    link: 'healthscore.html'
  }
};

// Read feature param from URL
const params = new URLSearchParams(window.location.search);
const key = params.get('f') || 'bmi';
const data = features[key] || features['bmi'];

// Populate page
document.title = data.title + ' — NutriGuide Pro';
document.getElementById('fiIcon').textContent = data.icon;
document.getElementById('fiTag').textContent = data.tag;
document.getElementById('fiTitle').textContent = data.title;
document.getElementById('fiWhat').textContent = data.what;

document.getElementById('fiHow').innerHTML =
  data.how.map(s => `<li>${s}</li>`).join('');

document.getElementById('fiBenefits').innerHTML =
  data.benefits.map(b => `<li>${b}</li>`).join('');

document.getElementById('fiFacts').innerHTML =
  data.facts.map(([k,v]) => `<li><span>${k}</span><span>${v}</span></li>`).join('');

const cta = document.getElementById('fiCTA');
cta.href = data.link;
cta.innerHTML = `Open ${data.title} <i class="fas fa-arrow-right"></i>`;

// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 20);
});
