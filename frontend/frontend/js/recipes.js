const recipeData = {
  egg: {
    emoji: '🥚', title: 'Egg Recipes',
    recipes: [
      {
        name: 'Boiled Egg Salad', calories: 180, time: '10 min', servings: 1,
        ingredients: [
          { name: 'Eggs', qty: '2 whole' },
          { name: 'Olive Oil', qty: '5 ml' },
          { name: 'Salt', qty: '1 pinch' },
          { name: 'Black Pepper', qty: '1 pinch' },
          { name: 'Lettuce', qty: '30 g' },
          { name: 'Tomato', qty: '50 g' },
        ],
        steps: ['Boil eggs for 8–10 minutes until hard-boiled.', 'Peel and slice eggs into halves.', 'Tear lettuce and chop tomato.', 'Mix all in a bowl, drizzle olive oil.', 'Season with salt and pepper. Serve fresh.']
      },
      {
        name: 'Scrambled Eggs', calories: 220, time: '8 min', servings: 1,
        ingredients: [
          { name: 'Eggs', qty: '3 whole' },
          { name: 'Butter', qty: '10 g' },
          { name: 'Milk', qty: '30 ml' },
          { name: 'Salt', qty: '1 pinch' },
          { name: 'Chives', qty: '5 g' },
        ],
        steps: ['Crack eggs into a bowl, add milk and whisk.', 'Heat butter in a non-stick pan on low heat.', 'Pour egg mixture into pan.', 'Stir gently with spatula, keep folding slowly.', 'Remove just before fully set. Top with chives.']
      },
      {
        name: 'Egg Veggie Omelette', calories: 260, time: '12 min', servings: 1,
        ingredients: [
          { name: 'Eggs', qty: '3 whole' },
          { name: 'Bell Pepper', qty: '40 g' },
          { name: 'Onion', qty: '30 g' },
          { name: 'Olive Oil', qty: '8 ml' },
          { name: 'Spinach', qty: '20 g' },
          { name: 'Salt & Pepper', qty: 'to taste' },
        ],
        steps: ['Dice bell pepper and onion finely.', 'Sauté vegetables in olive oil for 2 minutes.', 'Beat eggs with salt and pepper.', 'Pour eggs over vegetables in pan.', 'Cook on medium, fold omelette in half. Serve hot.']
      }
    ]
  },
  carrot: {
    emoji: '🥕', title: 'Carrot Recipes',
    recipes: [
      {
        name: 'Carrot Ginger Soup', calories: 150, time: '25 min', servings: 2,
        ingredients: [
          { name: 'Carrots', qty: '300 g' },
          { name: 'Ginger', qty: '10 g' },
          { name: 'Onion', qty: '80 g' },
          { name: 'Vegetable Stock', qty: '500 ml' },
          { name: 'Olive Oil', qty: '10 ml' },
          { name: 'Salt', qty: 'to taste' },
        ],
        steps: ['Peel and chop carrots and onion.', 'Sauté onion and ginger in olive oil for 3 min.', 'Add carrots and stock, bring to boil.', 'Simmer 15 minutes until carrots are soft.', 'Blend until smooth. Season and serve warm.']
      },
      {
        name: 'Carrot & Hummus Wrap', calories: 290, time: '10 min', servings: 1,
        ingredients: [
          { name: 'Whole Wheat Wrap', qty: '1 piece' },
          { name: 'Carrot', qty: '100 g' },
          { name: 'Hummus', qty: '40 g' },
          { name: 'Cucumber', qty: '50 g' },
          { name: 'Lemon Juice', qty: '5 ml' },
        ],
        steps: ['Shred or julienne the carrot.', 'Slice cucumber into thin strips.', 'Spread hummus over the wrap.', 'Layer carrot and cucumber, squeeze lemon.', 'Roll tightly and slice in half.']
      }
    ]
  },
  banana: {
    emoji: '🍌', title: 'Banana Recipes',
    recipes: [
      {
        name: 'Banana Oat Smoothie', calories: 280, time: '5 min', servings: 1,
        ingredients: [
          { name: 'Banana', qty: '1 medium' },
          { name: 'Oats', qty: '30 g' },
          { name: 'Milk', qty: '200 ml' },
          { name: 'Honey', qty: '10 g' },
          { name: 'Cinnamon', qty: '1 pinch' },
        ],
        steps: ['Peel and slice banana.', 'Add all ingredients to blender.', 'Blend for 45 seconds until smooth.', 'Pour into glass and sprinkle cinnamon. Serve cold.']
      },
      {
        name: 'Banana Pancakes', calories: 320, time: '15 min', servings: 2,
        ingredients: [
          { name: 'Banana', qty: '2 ripe' },
          { name: 'Eggs', qty: '2 whole' },
          { name: 'Oats', qty: '50 g' },
          { name: 'Cinnamon', qty: '1 tsp' },
          { name: 'Coconut Oil', qty: '5 ml' },
        ],
        steps: ['Mash bananas in a bowl until smooth.', 'Beat in eggs and mix well.', 'Stir in oats and cinnamon.', 'Heat coconut oil in pan over medium heat.', 'Pour small portions, cook 2 min each side. Serve.']
      }
    ]
  },
  chicken: {
    emoji: '🍗', title: 'Chicken Recipes',
    recipes: [
      {
        name: 'Grilled Chicken Breast', calories: 310, time: '20 min', servings: 1,
        ingredients: [
          { name: 'Chicken Breast', qty: '150 g' },
          { name: 'Olive Oil', qty: '10 ml' },
          { name: 'Garlic', qty: '2 cloves' },
          { name: 'Lemon Juice', qty: '15 ml' },
          { name: 'Mixed Herbs', qty: '1 tsp' },
          { name: 'Salt & Pepper', qty: 'to taste' },
        ],
        steps: ['Marinate chicken with oil, garlic, lemon, herbs for 15 min.', 'Preheat grill or pan to medium-high heat.', 'Grill chicken 6–7 minutes per side.', 'Check internal temp reaches 75°C.', 'Rest 3 minutes before slicing. Serve with greens.']
      },
      {
        name: 'Chicken Veggie Bowl', calories: 420, time: '25 min', servings: 1,
        ingredients: [
          { name: 'Chicken Breast', qty: '120 g' },
          { name: 'Brown Rice', qty: '80 g (dry)' },
          { name: 'Broccoli', qty: '100 g' },
          { name: 'Bell Pepper', qty: '60 g' },
          { name: 'Soy Sauce', qty: '10 ml' },
          { name: 'Sesame Oil', qty: '5 ml' },
        ],
        steps: ['Cook rice as per package instructions.', 'Dice chicken and stir-fry 8 minutes.', 'Add broccoli and pepper, cook 4 more minutes.', 'Drizzle soy sauce and sesame oil.', 'Serve chicken and veggies over rice.']
      }
    ]
  },
  spinach: {
    emoji: '🥬', title: 'Spinach Recipes',
    recipes: [
      {
        name: 'Spinach Smoothie', calories: 140, time: '5 min', servings: 1,
        ingredients: [
          { name: 'Spinach', qty: '80 g' },
          { name: 'Banana', qty: '1 small' },
          { name: 'Apple', qty: '100 g' },
          { name: 'Water', qty: '150 ml' },
          { name: 'Lemon Juice', qty: '10 ml' },
        ],
        steps: ['Wash spinach thoroughly.', 'Core and chop apple.', 'Add all ingredients to blender.', 'Blend until completely smooth.', 'Serve immediately for best nutrition.']
      },
      {
        name: 'Spinach Dal', calories: 240, time: '30 min', servings: 2,
        ingredients: [
          { name: 'Red Lentils', qty: '120 g' },
          { name: 'Spinach', qty: '150 g' },
          { name: 'Onion', qty: '80 g' },
          { name: 'Tomato', qty: '100 g' },
          { name: 'Cumin', qty: '1 tsp' },
          { name: 'Turmeric', qty: '0.5 tsp' },
          { name: 'Oil', qty: '10 ml' },
        ],
        steps: ['Boil lentils until soft (15 min).', 'Sauté onion in oil until golden.', 'Add cumin, turmeric, chopped tomato.', 'Cook 5 min, then add spinach and lentils.', 'Simmer 5 min. Serve with rice or roti.']
      }
    ]
  },
  oats: {
    emoji: '🌾', title: 'Oats Recipes',
    recipes: [
      {
        name: 'Overnight Oats', calories: 350, time: '5 min + overnight', servings: 1,
        ingredients: [
          { name: 'Rolled Oats', qty: '60 g' },
          { name: 'Milk', qty: '150 ml' },
          { name: 'Chia Seeds', qty: '10 g' },
          { name: 'Honey', qty: '15 g' },
          { name: 'Mixed Berries', qty: '60 g' },
          { name: 'Vanilla Extract', qty: '2 drops' },
        ],
        steps: ['Mix oats, milk, chia seeds and honey in a jar.', 'Stir well and add vanilla extract.', 'Cover and refrigerate overnight.', 'In the morning, top with berries.', 'Stir and enjoy cold — no cooking needed!']
      },
      {
        name: 'Oat Energy Bars', calories: 280, time: '20 min', servings: 4,
        ingredients: [
          { name: 'Oats', qty: '150 g' },
          { name: 'Peanut Butter', qty: '80 g' },
          { name: 'Honey', qty: '60 g' },
          { name: 'Dark Chocolate Chips', qty: '40 g' },
          { name: 'Flaxseeds', qty: '20 g' },
        ],
        steps: ['Mix peanut butter and honey in a pan over low heat.', 'Remove from heat, add oats and flaxseeds.', 'Fold in chocolate chips.', 'Press into lined tray evenly.', 'Refrigerate 1 hour, then cut into bars.']
      }
    ]
  },
  salmon: {
    emoji: '🐟', title: 'Salmon Recipes',
    recipes: [
      {
        name: 'Baked Lemon Salmon', calories: 380, time: '22 min', servings: 1,
        ingredients: [
          { name: 'Salmon Fillet', qty: '150 g' },
          { name: 'Lemon', qty: '1 whole' },
          { name: 'Garlic', qty: '2 cloves' },
          { name: 'Olive Oil', qty: '10 ml' },
          { name: 'Dill', qty: '5 g' },
          { name: 'Salt & Pepper', qty: 'to taste' },
        ],
        steps: ['Preheat oven to 200°C.', 'Place salmon on baking paper.', 'Rub with olive oil, minced garlic and dill.', 'Top with lemon slices, season well.', 'Bake 12–15 minutes. Serve with veggies.']
      }
    ]
  },
  avocado: {
    emoji: '🥑', title: 'Avocado Recipes',
    recipes: [
      {
        name: 'Avocado Toast', calories: 290, time: '8 min', servings: 1,
        ingredients: [
          { name: 'Avocado', qty: '1 ripe' },
          { name: 'Whole Grain Bread', qty: '2 slices' },
          { name: 'Lemon Juice', qty: '10 ml' },
          { name: 'Red Chilli Flakes', qty: '1 pinch' },
          { name: 'Salt & Pepper', qty: 'to taste' },
          { name: 'Egg (optional)', qty: '1 poached' },
        ],
        steps: ['Toast bread slices until golden.', 'Scoop avocado, mash with lemon juice.', 'Season with salt and pepper.', 'Spread generously on toast.', 'Top with chilli flakes and egg if using.']
      }
    ]
  },
  tomato: {
    emoji: '🍅', title: 'Tomato Recipes',
    recipes: [
      {
        name: 'Tomato Soup', calories: 130, time: '20 min', servings: 2,
        ingredients: [
          { name: 'Tomatoes', qty: '400 g' },
          { name: 'Onion', qty: '80 g' },
          { name: 'Garlic', qty: '3 cloves' },
          { name: 'Olive Oil', qty: '10 ml' },
          { name: 'Vegetable Stock', qty: '300 ml' },
          { name: 'Basil', qty: '5 g' },
        ],
        steps: ['Chop tomatoes, onion and garlic.', 'Sauté onion and garlic in olive oil 3 min.', 'Add tomatoes and stock, simmer 12 min.', 'Blend until smooth.', 'Serve hot, garnish with fresh basil.']
      }
    ]
  },
  lentil: {
    emoji: '🫘', title: 'Lentil Recipes',
    recipes: [
      {
        name: 'Masoor Dal', calories: 220, time: '25 min', servings: 2,
        ingredients: [
          { name: 'Red Lentils', qty: '150 g' },
          { name: 'Onion', qty: '100 g' },
          { name: 'Tomato', qty: '100 g' },
          { name: 'Ginger-Garlic Paste', qty: '10 g' },
          { name: 'Cumin Seeds', qty: '1 tsp' },
          { name: 'Turmeric', qty: '0.5 tsp' },
          { name: 'Oil', qty: '10 ml' },
        ],
        steps: ['Rinse lentils and boil with turmeric until soft.', 'Heat oil, add cumin seeds till they splutter.', 'Add onion, cook golden, add ginger-garlic.', 'Add chopped tomatoes, cook 5 min.', 'Mix in boiled lentils, simmer 5 min. Serve.']
      }
    ]
  },
  milk: {
    emoji: '🥛', title: 'Milk Recipes',
    recipes: [
      {
        name: 'Golden Turmeric Milk', calories: 160, time: '5 min', servings: 1,
        ingredients: [
          { name: 'Milk', qty: '250 ml' },
          { name: 'Turmeric', qty: '0.5 tsp' },
          { name: 'Honey', qty: '10 g' },
          { name: 'Cinnamon', qty: '0.25 tsp' },
          { name: 'Black Pepper', qty: '1 pinch' },
        ],
        steps: ['Heat milk in a saucepan on medium heat.', 'Whisk in turmeric, cinnamon, black pepper.', 'Heat until just steaming, do not boil.', 'Pour into cup, stir in honey.', 'Drink warm before bed for best benefits.']
      }
    ]
  },
  apple: {
    emoji: '🍎', title: 'Apple Recipes',
    recipes: [
      {
        name: 'Apple Cinnamon Porridge', calories: 310, time: '10 min', servings: 1,
        ingredients: [
          { name: 'Oats', qty: '60 g' },
          { name: 'Apple', qty: '1 medium' },
          { name: 'Milk', qty: '200 ml' },
          { name: 'Cinnamon', qty: '1 tsp' },
          { name: 'Walnuts', qty: '15 g' },
          { name: 'Honey', qty: '10 g' },
        ],
        steps: ['Cook oats in milk on medium heat, stirring.', 'Peel and dice apple, add to oats.', 'Cook 5 minutes until oats are creamy.', 'Pour into bowl, top with walnuts.', 'Drizzle honey and sprinkle cinnamon. Serve.']
      }
    ]
  }
};

function showRecipes(food) {
  const data = recipeData[food];
  if (!data) return;

  document.getElementById('foodGrid').classList.add('hidden');
  const panel = document.getElementById('recipePanel');
  panel.classList.remove('hidden');

  document.getElementById('panelEmoji').textContent = data.emoji;
  document.getElementById('panelTag').textContent = `${data.recipes.length} Recipe${data.recipes.length > 1 ? 's' : ''}`;
  document.getElementById('panelTitle').textContent = data.title;

  document.getElementById('recipesList').innerHTML = data.recipes.map(r => `
    <div class="recipe-card">
      <div class="recipe-card-header">
        <span class="recipe-name">${data.emoji} ${r.name}</span>
        <div class="recipe-meta">
          <span class="recipe-tag"><i class="fas fa-clock"></i> ${r.time}</span>
          <span class="recipe-tag"><i class="fas fa-user"></i> ${r.servings} serving</span>
          <span class="recipe-tag"><i class="fas fa-fire"></i> ${r.calories} kcal</span>
        </div>
      </div>
      <div class="recipe-card-body">
        <div class="recipe-two-col">
          <div>
            <p class="recipe-section-title"><i class="fas fa-list"></i> Ingredients</p>
            <ul class="ingredients-list">
              ${r.ingredients.map(i => `
                <li>
                  <span class="ing-name">${i.name}</span>
                  <span class="ing-qty">${i.qty}</span>
                </li>`).join('')}
            </ul>
          </div>
          <div>
            <p class="recipe-section-title"><i class="fas fa-shoe-prints"></i> Steps</p>
            <ol class="steps-list">
              ${r.steps.map((s, i) => `
                <li>
                  <span class="step-num">${i+1}</span>
                  <span>${s}</span>
                </li>`).join('')}
            </ol>
          </div>
        </div>
        <div class="recipe-calories-bar">
          <i class="fas fa-fire-flame-curved"></i>
          Total Calories: <strong>${r.calories} kcal</strong> per serving
        </div>
      </div>
    </div>
  `).join('');
}

function backToGrid() {
  document.getElementById('recipePanel').classList.add('hidden');
  document.getElementById('foodGrid').classList.remove('hidden');
}
