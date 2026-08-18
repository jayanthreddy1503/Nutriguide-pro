const nutritionData = {
  'Fatigue': {
    icon: '😴',
    deficiency: 'Iron & Vitamin B12 Deficiency',
    nutrients: ['Iron', 'Vitamin B12', 'Folate', 'Magnesium'],
    foods: ['Spinach', 'Lentils', 'Eggs', 'Salmon', 'Bananas', 'Almonds', 'Fortified cereals', 'Chicken liver']
  },
  'Hair Fall': {
    icon: '💇',
    deficiency: 'Biotin & Protein Deficiency',
    nutrients: ['Biotin', 'Protein', 'Zinc', 'Iron', 'Omega-3'],
    foods: ['Eggs', 'Greek yogurt', 'Sweet potato', 'Avocado', 'Nuts', 'Fish', 'Legumes', 'Sunflower seeds']
  },
  'Bone Pain': {
    icon: '🦴',
    deficiency: 'Vitamin D & Calcium Deficiency',
    nutrients: ['Vitamin D', 'Calcium', 'Magnesium', 'Phosphorus'],
    foods: ['Milk', 'Cheese', 'Sardines', 'Broccoli', 'Tofu', 'Fortified OJ', 'Salmon', 'Kale']
  },
  'Low Immunity': {
    icon: '🛡️',
    deficiency: 'Vitamin C & Zinc Deficiency',
    nutrients: ['Vitamin C', 'Zinc', 'Vitamin D', 'Selenium'],
    foods: ['Oranges', 'Bell peppers', 'Garlic', 'Ginger', 'Kiwi', 'Turmeric', 'Sunflower seeds', 'Green tea']
  },
  'Muscle Cramps': {
    icon: '💪',
    deficiency: 'Magnesium & Potassium Deficiency',
    nutrients: ['Magnesium', 'Potassium', 'Sodium', 'Calcium'],
    foods: ['Bananas', 'Avocado', 'Dark chocolate', 'Nuts', 'Leafy greens', 'Sweet potato', 'Coconut water', 'Beans']
  },
  'Poor Vision': {
    icon: '👁️',
    deficiency: 'Vitamin A & Lutein Deficiency',
    nutrients: ['Vitamin A', 'Lutein', 'Zeaxanthin', 'Omega-3'],
    foods: ['Carrots', 'Sweet potato', 'Leafy greens', 'Eggs', 'Pumpkin', 'Bell peppers', 'Fish', 'Berries']
  },
  'Dry Skin': {
    icon: '🧴',
    deficiency: 'Vitamin E & Essential Fatty Acids',
    nutrients: ['Vitamin E', 'Omega-3', 'Vitamin C', 'Zinc'],
    foods: ['Almonds', 'Avocado', 'Olive oil', 'Walnuts', 'Fatty fish', 'Flaxseeds', 'Sweet potato', 'Sunflower seeds']
  },
  'Frequent Headache': {
    icon: '🤕',
    deficiency: 'Magnesium & Hydration Deficit',
    nutrients: ['Magnesium', 'Riboflavin (B2)', 'CoQ10', 'Water'],
    foods: ['Water', 'Nuts & Seeds', 'Leafy greens', 'Whole grains', 'Bananas', 'Dark chocolate', 'Broccoli', 'Fish']
  },
  'None': {
    icon: '✅',
    deficiency: 'No Deficiencies Detected',
    nutrients: ['Balanced Diet', 'Hydration', 'Regular Exercise'],
    foods: ['Fruits', 'Vegetables', 'Whole grains', 'Lean protein', 'Nuts', 'Legumes', 'Dairy or alternatives', 'Water']
  }
};

function analyzeNutrition() {
  const symptom = document.getElementById('symptom').value;
  if (!symptom) { toast('Please select a symptom.', 'warning'); return; }

  const d = nutritionData[symptom];
  document.getElementById('emptyCard').style.display = 'none';
  document.getElementById('resultCard').style.display = 'block';

  document.getElementById('resultIcon').textContent = d.icon;
  document.getElementById('resultSymptom').textContent = symptom;
  document.getElementById('resultTitle').textContent = d.deficiency;

  document.getElementById('nutrientBox').innerHTML =
    d.nutrients.map(n => `<span class="nutr-pill">${n}</span>`).join('');

  document.getElementById('foodList').innerHTML =
    d.foods.map(f => `<li>${f}</li>`).join('');
}

// Extra symptoms added
Object.assign(nutritionData, {
  'Anxiety & Stress': {
    icon: '😰',
    deficiency: 'Magnesium & B-Vitamin Deficiency',
    nutrients: ['Magnesium', 'Vitamin B6', 'Vitamin B12', 'L-Theanine', 'Omega-3'],
    foods: ['Dark chocolate', 'Chamomile tea', 'Blueberries', 'Almonds', 'Oats', 'Salmon', 'Spinach', 'Turmeric']
  },
  'Poor Sleep': {
    icon: '😴',
    deficiency: 'Melatonin & Tryptophan Deficiency',
    nutrients: ['Melatonin', 'Tryptophan', 'Magnesium', 'Calcium'],
    foods: ['Warm milk', 'Bananas', 'Almonds', 'Kiwi', 'Tart cherry juice', 'Oats', 'Turkey', 'Walnuts']
  },
  'Weak Nails': {
    icon: '💅',
    deficiency: 'Biotin & Calcium Deficiency',
    nutrients: ['Biotin', 'Calcium', 'Iron', 'Vitamin C'],
    foods: ['Eggs', 'Sunflower seeds', 'Milk', 'Lentils', 'Salmon', 'Sweet potato', 'Berries', 'Spinach']
  },
  'Low Energy After Meals': {
    icon: '😩',
    deficiency: 'Blood Sugar Imbalance / Iron Deficiency',
    nutrients: ['Iron', 'Fibre', 'Protein', 'Vitamin B1 (Thiamine)'],
    foods: ['Whole grains', 'Legumes', 'Leafy greens', 'Nuts', 'Eggs', 'Brown rice', 'Quinoa', 'Apples']
  },
  'Bloating': {
    icon: '🫃',
    deficiency: 'Probiotic & Fibre Imbalance',
    nutrients: ['Probiotics', 'Digestive Enzymes', 'Fibre', 'Potassium'],
    foods: ['Yogurt', 'Ginger tea', 'Cucumber', 'Banana', 'Fennel seeds', 'Peppermint', 'Pineapple', 'Kefir']
  },
  'Frequent Colds': {
    icon: '🤧',
    deficiency: 'Vitamin C & Zinc Deficiency',
    nutrients: ['Vitamin C', 'Zinc', 'Elderberry', 'Vitamin D', 'Probiotics'],
    foods: ['Oranges', 'Kiwi', 'Garlic', 'Ginger', 'Honey', 'Turmeric milk', 'Broccoli', 'Red bell pepper']
  },
  'Constipation': {
    icon: '🚽',
    deficiency: 'Fibre & Water Deficiency',
    nutrients: ['Dietary Fibre', 'Water', 'Magnesium', 'Probiotics'],
    foods: ['Prunes', 'Flaxseeds', 'Oats', 'Beans', 'Pears', 'Broccoli', 'Water (2L+)', 'Yogurt']
  },
  'High Blood Pressure': {
    icon: '🩺',
    deficiency: 'Potassium & Magnesium Deficiency',
    nutrients: ['Potassium', 'Magnesium', 'Omega-3', 'Nitrates'],
    foods: ['Bananas', 'Beets', 'Leafy greens', 'Avocado', 'Berries', 'Oats', 'Dark chocolate', 'Pomegranate']
  },
  'Acne / Skin Breakouts': {
    icon: '😣',
    deficiency: 'Vitamin A & Zinc Deficiency',
    nutrients: ['Zinc', 'Vitamin A', 'Omega-3', 'Vitamin E', 'Probiotics'],
    foods: ['Pumpkin seeds', 'Sweet potato', 'Salmon', 'Green tea', 'Turmeric', 'Berries', 'Carrots', 'Yogurt']
  }
});
