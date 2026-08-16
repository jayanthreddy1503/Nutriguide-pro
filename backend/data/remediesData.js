const remediesData = [
  {
    problem: 'Cold',
    emoji: '🤧',
    remedy: 'Warm Ginger Tea with Honey',
    preparation: 'Boil 1 cup of water. Add 1 inch of freshly grated ginger. Simmer for 5 minutes. Strain into a cup. Add 1 teaspoon of raw honey and a squeeze of lemon. Sip slowly while warm. Have 2–3 times a day.',
    science: 'Ginger contains gingerol and shogaol — bioactive compounds that may support the immune response and have anti-inflammatory properties. Honey may help soothe the throat and has traditionally been used for its antimicrobial properties. Lemon provides Vitamin C which may support immune function.',
    activeCompounds: ['Gingerol', 'Shogaol', 'Vitamin C', 'Flavonoids'],
    nutritionBenefit: 'This remedy provides Vitamin C from lemon which may support immune cell function. Ginger may support digestive health. Honey provides natural energy and may coat and soothe an irritated throat lining.',
    lifestyleTips: [
      'Rest as much as possible — sleep is when your body repairs itself',
      'Stay well hydrated with warm fluids throughout the day',
      'Avoid cold drinks and ice cream which may worsen throat irritation',
      'Use steam inhalation with a towel over your head for nasal congestion'
    ],
    doctorWarning: 'Seek medical advice if fever rises above 102°F, if symptoms last more than 7 days, if you experience difficulty breathing, or if a young child or elderly person is affected.'
  },
  {
    problem: 'Cough',
    emoji: '😮‍💨',
    remedy: 'Turmeric Milk (Haldi Doodh)',
    preparation: 'Heat 1 glass of milk until warm. Add half teaspoon of turmeric powder. Add a pinch of black pepper. Optionally add quarter teaspoon of ginger powder and honey to taste. Stir well and drink before bedtime.',
    science: 'Curcumin in turmeric has well-studied anti-inflammatory properties and may support the immune system. Black pepper contains piperine which may increase curcumin absorption significantly. Milk provides warmth and calcium.',
    activeCompounds: ['Curcumin', 'Piperine', 'Calcium', 'Antioxidants'],
    nutritionBenefit: 'Turmeric milk provides calcium for bone health, protein from milk, and curcumin which may support the body natural anti-inflammatory response. The warm liquid may help loosen mucus and soothe the throat.',
    lifestyleTips: [
      'Drink warm fluids throughout the day to stay hydrated',
      'Avoid cold beverages and air-conditioned rooms during recovery',
      'Use a humidifier or inhale steam to moisten airways',
      'Honey can be added for additional soothing properties'
    ],
    doctorWarning: 'A persistent cough lasting more than 2 weeks needs medical evaluation. Seek immediate care if coughing up blood, experiencing chest pain, or having difficulty breathing.'
  },
  {
    problem: 'Acidity',
    emoji: '🔥',
    remedy: 'Coconut Water with Banana',
    preparation: 'Drink 1 glass of fresh coconut water on an empty stomach or after meals. Eat 1 ripe banana alongside. Alternatively, mix 1 teaspoon of raw coconut water with a pinch of cardamom. Have this 2 times a day.',
    science: 'Coconut water has an alkaline pH that may help neutralise excess stomach acid. Banana contains natural antacids and mucilage that may coat the stomach lining, providing a protective barrier.',
    activeCompounds: ['Potassium', 'Magnesium', 'Natural Antacids', 'Mucilage'],
    nutritionBenefit: 'Coconut water provides electrolytes including potassium and magnesium. Banana provides dietary fiber which may support digestive health and potassium which supports muscle function including the stomach muscles.',
    lifestyleTips: [
      'Eat smaller, more frequent meals instead of large meals',
      'Avoid lying down for at least 2 hours after eating',
      'Reduce spicy, oily, and fried foods in your daily diet',
      'Drink warm water instead of cold water throughout the day'
    ],
    doctorWarning: 'Seek medical care for severe, frequent, or chronic acid reflux, difficulty swallowing, unexplained weight loss, or vomiting blood. These may indicate conditions requiring medical treatment.'
  },
  {
    problem: 'Constipation',
    emoji: '😣',
    remedy: 'Warm Water with Triphala',
    preparation: 'Mix half teaspoon of Triphala powder in 1 glass of warm water. Stir well and drink at bedtime or first thing in the morning on an empty stomach. Alternatively, soak 2 dried figs in water overnight and eat them in the morning.',
    science: 'Triphala is an Ayurvedic formulation combining three fruits. It may support digestive motility — the natural movement of the intestines. The tannins and gallic acid in these fruits may support healthy gut bacteria and bowel regularity.',
    activeCompounds: ['Tannins', 'Gallic Acid', 'Chebulinic Acid', 'Vitamin C'],
    nutritionBenefit: 'Triphala is rich in Vitamin C, antioxidants, and compounds that may support the digestive system. The warm water helps hydrate the intestines and stimulate natural bowel movement.',
    lifestyleTips: [
      'Drink at least 8–10 glasses of water daily',
      'Include high-fiber foods: vegetables, fruits, and whole grains',
      'Walk for at least 20–30 minutes after meals',
      'Do not ignore the urge to use the toilet'
    ],
    doctorWarning: 'If constipation does not improve within 3 days, if you notice blood in the stool, experience severe abdominal pain, or if constipation is a new symptom — consult a doctor immediately.'
  },
  {
    problem: 'Poor Sleep',
    emoji: '😴',
    remedy: 'Warm Milk with Ashwagandha',
    preparation: 'Heat 1 glass of milk until warm. Add quarter teaspoon of Ashwagandha powder. Add 1 teaspoon of honey and a pinch of nutmeg. Stir well and drink 30–45 minutes before bedtime. Do this daily for at least 2 weeks.',
    science: 'Milk contains tryptophan — an amino acid that is a precursor to serotonin and melatonin, the sleep hormone. Ashwagandha is classified as an adaptogen and may support the body stress response. Research suggests it may help reduce cortisol levels which interfere with sleep.',
    activeCompounds: ['Tryptophan', 'Withanolides', 'Myristicin', 'Serotonin Precursors'],
    nutritionBenefit: 'This combination provides tryptophan for melatonin production, calcium for nerve function, and adaptogenic compounds from Ashwagandha that may support the nervous system ability to manage stress.',
    lifestyleTips: [
      'Maintain a consistent sleep schedule — same time every day',
      'Avoid screens for at least 1 hour before bedtime',
      'Keep your bedroom cool, dark, and quiet',
      'Avoid caffeine after 3 PM — it can stay in your system for 6 hours'
    ],
    doctorWarning: 'Chronic insomnia lasting 3 or more months needs professional medical attention. Seek help if poor sleep is affecting your daily functioning, mood, or work performance.'
  },
  {
    problem: 'Joint Pain',
    emoji: '🦵',
    remedy: 'Ginger and Turmeric Kadha',
    preparation: 'Boil 2 cups of water. Add 1 inch of fresh ginger sliced, half teaspoon of turmeric, and 5–6 black pepper corns. Simmer for 10 minutes. Strain and add honey to taste. Drink 1 cup twice daily.',
    science: 'Both ginger and turmeric contain compounds with studied anti-inflammatory properties. Gingerol in ginger may inhibit inflammatory pathways. Curcumin in turmeric has been researched for its potential to reduce inflammation markers.',
    activeCompounds: ['Gingerol', 'Curcumin', 'Piperine', '6-Shogaol'],
    nutritionBenefit: 'This kadha provides anti-inflammatory compounds that may support joint comfort. Ginger may support circulation. Turmeric may support the body natural anti-inflammatory response relevant for joint health.',
    lifestyleTips: [
      'Maintain a healthy body weight to reduce stress on joints',
      'Do gentle low-impact exercises like walking or swimming',
      'Apply warm compression to stiff joints in the morning',
      'Avoid prolonged sitting or standing in one position'
    ],
    doctorWarning: 'Seek medical evaluation for severe joint swelling, redness, warmth, or joint pain with fever. Joint pain that limits daily activities needs professional diagnosis.'
  },
  {
    problem: 'Weakness',
    emoji: '😩',
    remedy: 'Dates, Dry Fruits, and Warm Milk',
    preparation: 'Soak 4–5 dates and 6–8 mixed dry fruits overnight in water. Eat them in the morning on an empty stomach. Follow with 1 glass of warm milk with a pinch of saffron. Do this daily for 3–4 weeks.',
    science: 'Dates are rich in natural sugars, iron, and B vitamins that support energy production at the cellular level. Almonds provide Vitamin E and magnesium which support muscle function. Saffron contains crocin which may support mood and energy.',
    activeCompounds: ['Iron', 'Magnesium', 'Vitamin E', 'B Vitamins', 'Crocin'],
    nutritionBenefit: 'This combination provides iron for oxygen transport addressing anemia-related weakness, natural sugars for immediate energy, B vitamins for energy metabolism, and calcium and protein from milk for muscle support.',
    lifestyleTips: [
      'Eat regular meals — do not skip breakfast',
      'Include iron-rich foods: spinach, lentils, and jaggery in daily meals',
      'Get adequate sleep — 7–8 hours per night',
      'Light exercise like morning walks can actually improve energy levels'
    ],
    doctorWarning: 'Persistent weakness lasting more than 2 weeks may indicate underlying conditions such as anemia, thyroid disorders, diabetes, or vitamin deficiencies. Please consult a doctor for proper diagnosis and blood tests.'
  },
  {
    problem: 'Headache',
    emoji: '🤕',
    remedy: 'Peppermint Oil Massage and Hydration',
    preparation: 'Dilute 2 drops of peppermint essential oil in 1 teaspoon of coconut oil. Gently massage onto temples, forehead, and back of neck in circular motions. Drink 2–3 glasses of water immediately. Rest in a quiet, dark room.',
    science: 'Menthol in peppermint oil may activate cold receptors in the skin, creating a cooling sensation that may help relax tense muscles. Research suggests peppermint oil applied to temples may be comparable to low-dose analgesics for tension headaches. Dehydration is one of the most common causes of headaches.',
    activeCompounds: ['Menthol', 'Menthone', 'Rosmarinic Acid'],
    nutritionBenefit: 'Staying hydrated is the most important nutritional factor for preventing headaches. Magnesium deficiency is linked to headaches — include foods like spinach, nuts, and seeds regularly.',
    lifestyleTips: [
      'Drink at least 8–10 glasses of water daily to prevent dehydration headaches',
      'Maintain regular meal times — low blood sugar can trigger headaches',
      'Reduce screen time and take eye breaks every 20 minutes',
      'Practice relaxation techniques like deep breathing or gentle neck stretches'
    ],
    doctorWarning: 'Seek emergency medical care immediately for a sudden severe thunderclap headache, headache with stiff neck, headache with vision changes, confusion, or weakness. These may indicate serious conditions.'
  },
  {
    problem: 'Sore Throat',
    emoji: '🤒',
    remedy: 'Salt Water Gargle and Tulsi Tea',
    preparation: 'Mix half teaspoon of salt in 1 glass of warm water. Gargle for 30 seconds and spit out. Repeat 3–4 times. Then prepare Tulsi tea: boil 8–10 fresh Tulsi leaves in 1 cup of water for 5 minutes. Add honey and a pinch of black pepper. Sip slowly.',
    science: 'Salt water creates a hypertonic environment that may help reduce swelling in throat tissues through osmosis. It may also help reduce bacterial load. Tulsi contains eugenol and rosmarinic acid which have studied antimicrobial and anti-inflammatory properties.',
    activeCompounds: ['Eugenol', 'Rosmarinic Acid', 'Ursolic Acid', 'Sodium Chloride'],
    nutritionBenefit: 'Tulsi tea provides antioxidants and compounds that may support immune function. Honey provides natural sugars for energy and may have antimicrobial properties.',
    lifestyleTips: [
      'Avoid cold drinks, ice cream, and refrigerated foods completely',
      'Speak less and rest your voice when possible',
      'Steam inhalation with a few drops of eucalyptus oil may help',
      'Stay warm and avoid exposure to cold air or air conditioning'
    ],
    doctorWarning: 'Seek immediate medical care for difficulty swallowing, difficulty breathing, drooling, very high fever, or if the throat pain is severe. These may indicate conditions like tonsillitis requiring urgent treatment.'
  },
  {
    problem: 'Indigestion',
    emoji: '🤢',
    remedy: 'Ajwain (Carom Seeds) Water',
    preparation: 'Dry roast 1 teaspoon of ajwain seeds in a pan for 1–2 minutes. Crush lightly. Boil in 1 cup of water for 5 minutes. Strain and drink warm. Alternatively, chew half teaspoon of raw ajwain seeds with a pinch of black salt and swallow with warm water after meals.',
    science: 'Ajwain contains thymol as its primary active compound. Thymol may stimulate the secretion of gastric juices and digestive enzymes, supporting the breakdown of food. It may also help reduce intestinal gas and bloating.',
    activeCompounds: ['Thymol', 'Carvacrol', 'Limonene', 'Gamma-Terpinene'],
    nutritionBenefit: 'Ajwain may support the production of digestive enzymes making nutrient absorption more efficient. It is traditionally used after heavy or oily meals. The warm water component helps stimulate digestive movement.',
    lifestyleTips: [
      'Eat slowly and chew food thoroughly before swallowing',
      'Avoid eating while stressed, rushed, or distracted',
      'Walk for 10–15 minutes after meals to support digestion',
      'Avoid lying down immediately after eating'
    ],
    doctorWarning: 'Seek medical evaluation for severe abdominal pain, vomiting blood, black or tarry stools, unexplained weight loss, or indigestion symptoms that persist despite remedies.'
  },
  {
    problem: 'Skin Dryness',
    emoji: '🧴',
    remedy: 'Coconut Oil and Aloe Vera',
    preparation: 'Apply virgin coconut oil generously to dry skin areas after bathing while skin is slightly damp. For face: mix 1 tablespoon of fresh aloe vera gel with 3–4 drops of coconut oil. Apply as a moisturising mask for 20 minutes then rinse. Use daily.',
    science: 'Coconut oil contains lauric acid and medium-chain fatty acids that may support the skin barrier function and help reduce moisture loss. Aloe vera contains acemannan, a polysaccharide that may support skin hydration and has traditionally been used to soothe skin.',
    activeCompounds: ['Lauric Acid', 'Acemannan', 'Vitamin E', 'Aloesin'],
    nutritionBenefit: 'For internal skin health, increase intake of Omega-3 fatty acids found in flaxseeds, walnuts, and fish, and Vitamin E found in almonds and sunflower seeds. Staying well hydrated is equally important for skin moisture from within.',
    lifestyleTips: [
      'Drink at least 8 glasses of water daily for skin hydration from within',
      'Avoid hot showers which strip natural oils from the skin',
      'Apply moisturiser within 3 minutes of bathing while skin is damp',
      'Include healthy fats in your diet: avocado, nuts, seeds, and coconut'
    ],
    doctorWarning: 'See a dermatologist for extremely dry, cracked, or bleeding skin, skin that itches severely, rashes, or if dry skin is accompanied by other symptoms like fatigue or unexplained weight changes.'
  },
  {
    problem: 'Fatigue',
    emoji: '🥱',
    remedy: 'Banana, Jaggery, and Lemon Water',
    preparation: 'In the morning: eat 1–2 ripe bananas. Mix 1 teaspoon of jaggery in 1 glass of warm water with juice of half a lemon. Drink this as your morning energiser. For mid-afternoon fatigue: eat dates with a small handful of mixed nuts as a snack.',
    science: 'Bananas provide glucose, fructose, and sucrose for immediate and sustained energy, along with Vitamin B6 which supports energy metabolism. Jaggery contains iron, magnesium, and potassium. Lemon provides Vitamin C which may enhance iron absorption from jaggery.',
    activeCompounds: ['Vitamin B6', 'Iron', 'Magnesium', 'Vitamin C', 'Natural Sugars'],
    nutritionBenefit: 'This remedy provides iron for oxygen transport addressing fatigue from anemia, B vitamins for cellular energy production, Vitamin C to enhance iron absorption, and natural sugars for immediate energy.',
    lifestyleTips: [
      'Do not skip meals — blood sugar drops cause fatigue',
      'Ensure 7–8 hours of quality sleep every night',
      'Light exercise like walking paradoxically increases energy levels',
      'Reduce tea and coffee — they may cause energy crashes after initial boost'
    ],
    doctorWarning: 'Chronic fatigue lasting more than 2 weeks needs medical investigation. It may indicate anemia, thyroid disorders, diabetes, depression, sleep apnea, or other conditions. Please get a blood test done.'
  },
  {
    problem: 'Loss of Appetite',
    emoji: '🍽️',
    remedy: 'Ginger, Lemon, and Rock Salt Before Meals',
    preparation: 'Cut 4–5 thin slices of fresh ginger. Add a squeeze of lemon juice and a pinch of rock salt. Eat this 15–20 minutes before each meal. Alternatively, prepare ginger tea: boil ginger slices in water, add lemon and a little honey. Sip before meals.',
    science: 'Ginger may stimulate the production of digestive juices and gastric acids that prepare the stomach for food. The sour taste of lemon activates salivary glands and may trigger appetite signals. Rock salt provides minerals including sodium that support digestion.',
    activeCompounds: ['Gingerol', 'Citric Acid', 'Zinc', 'Digestive Enzymes'],
    nutritionBenefit: 'Stimulating digestive enzyme production through this remedy may improve the absorption of nutrients from subsequent meals. Zinc deficiency is commonly linked to loss of appetite — include zinc-rich foods like pumpkin seeds, legumes, and dairy.',
    lifestyleTips: [
      'Eat small portions more frequently rather than forcing large meals',
      'Make meals visually appealing — presentation influences appetite',
      'Eat at regular times to establish a routine that signals hunger',
      'Light physical activity before meals can stimulate appetite naturally'
    ],
    doctorWarning: 'Prolonged loss of appetite lasting more than 1–2 weeks needs medical evaluation. It may indicate underlying infections, digestive disorders, medication side effects, or depression.'
  },
  {
    problem: 'Low Hydration',
    emoji: '💧',
    remedy: 'ORS — Oral Rehydration Solution',
    preparation: 'Prepare homemade ORS: dissolve 6 level teaspoons of sugar and half teaspoon of salt in 1 litre of clean boiled water. Stir until completely dissolved. Add lemon juice for taste and Vitamin C. Sip slowly — do not drink rapidly. Aim for 200–400ml per hour.',
    science: 'ORS works through sodium-glucose co-transport. Glucose in the intestine actively carries sodium across the intestinal wall, pulling water along with it. This is significantly more effective than drinking plain water when dehydrated because it replaces both fluid and electrolytes simultaneously.',
    activeCompounds: ['Sodium', 'Glucose', 'Potassium', 'Vitamin C'],
    nutritionBenefit: 'ORS directly restores electrolyte balance — sodium, potassium, and chloride — which are critical for nerve signalling, muscle function, and fluid balance. Proper hydration supports kidney function and body temperature regulation.',
    lifestyleTips: [
      'Prevention: drink water consistently throughout the day, not just when thirsty',
      'Urine colour is a guide — pale yellow means well hydrated, dark yellow means drink more',
      'Increase water intake during heat, exercise, illness, and travel',
      'Include water-rich foods: cucumber, watermelon, oranges, and yoghurt'
    ],
    doctorWarning: 'Severe dehydration is a medical emergency. Signs include: no urination for 8 or more hours, extreme thirst, sunken eyes, confusion, rapid heartbeat, or inability to keep fluids down. Go to a hospital immediately.'
  },
  {
    problem: 'Heat Exhaustion',
    emoji: '🥵',
    remedy: 'Cool Water, ORS, and Rest in Shade',
    preparation: 'Immediately move to a cool shaded area. Apply cool wet cloths to forehead, neck, armpits, and wrists. Prepare ORS and sip slowly. Rest for at least 1–2 hours. Do not resume outdoor activity the same day.',
    science: 'Heat exhaustion occurs when the body loses excessive fluid and electrolytes through sweating in high temperatures. Cooling the skin at major blood vessels helps lower core body temperature. ORS restores electrolyte balance faster than plain water.',
    activeCompounds: ['Sodium', 'Potassium', 'Glucose', 'Electrolytes'],
    nutritionBenefit: 'Sodium and potassium from ORS are critical for restoring fluid balance. Potassium from coconut water or bananas helps restore muscle function. Glucose provides energy to cells stressed by heat. Avoid caffeine and alcohol which worsen dehydration.',
    lifestyleTips: [
      'Avoid outdoor activity between 10 AM and 5 PM in Anantapur during summer',
      'Wear loose, light-coloured cotton clothing outdoors',
      'Carry water and ORS sachets when going out in heat',
      'Eat light meals — heavy digestion increases body heat'
    ],
    doctorWarning: 'Heatstroke is a life-threatening emergency — different from heat exhaustion. Signs: body temperature above 40°C, no sweating despite heat, confusion, loss of consciousness. Call emergency services immediately.'
  },
  {
    problem: 'Mild Fever',
    emoji: '🌡️',
    remedy: 'Tulsi, Ginger, and Honey Tea with Wet Cloth',
    preparation: 'Boil 10 fresh Tulsi leaves, 1 inch of ginger sliced, and 5 black pepper corns in 2 cups of water for 10 minutes. Strain. Add 1 teaspoon of honey. Drink warm 2–3 times daily. Apply cool wet cloth on forehead and replace every 10–15 minutes.',
    science: 'Tulsi contains eugenol and ursolic acid which may support immune function and have anti-inflammatory properties. Ginger may help support the body temperature regulation. The wet cloth on the forehead provides evaporative cooling which may help reduce discomfort.',
    activeCompounds: ['Eugenol', 'Ursolic Acid', 'Gingerol', 'Piperine'],
    nutritionBenefit: 'During fever, metabolic rate increases and the body uses more nutrients. This tea provides antioxidants and compounds that may support the immune response. Honey provides easily digestible energy. Staying hydrated is critical during fever.',
    lifestyleTips: [
      'Rest completely — activity raises body temperature further',
      'Stay very well hydrated: warm water, coconut water, herbal teas',
      'Eat light, easily digestible foods: khichdi, soups, rice',
      'Keep the room well ventilated — avoid heavy blankets initially'
    ],
    doctorWarning: 'Seek immediate medical care if fever exceeds 103°F, if fever lasts more than 3 days, if accompanied by severe headache and neck stiffness, rash, difficulty breathing, or in infants under 3 months.'
  },
  {
    problem: 'Gas / Bloating',
    emoji: '😤',
    remedy: 'Hing (Asafoetida) Water and Fennel Seeds',
    preparation: 'Dissolve a small pinch of hing in 1 glass of warm water. Drink slowly after meals. Alternatively, chew 1 teaspoon of fennel seeds slowly after meals. For quick relief: boil 1 teaspoon of fennel seeds in 1 cup of water for 5 minutes, strain and drink warm.',
    science: 'Hing contains ferulic acid and coumarins that may help break down complex carbohydrates that cause gas fermentation in the intestine. Fennel seeds contain anethole which may reduce intestinal spasms and help expel trapped gas.',
    activeCompounds: ['Ferulic Acid', 'Anethole', 'Fenchone', 'Coumarins'],
    nutritionBenefit: 'These remedies may improve digestive enzyme activity, reducing incomplete digestion which causes gas. Fennel provides small amounts of fiber, calcium, and iron. Regular use after meals may support overall digestive comfort.',
    lifestyleTips: [
      'Eat slowly and avoid talking while eating to reduce air swallowing',
      'Identify and reduce gas-producing foods: raw onion, cabbage, beans',
      'Soak beans and lentils overnight before cooking to reduce gas content',
      'Gentle clockwise abdominal massage may help move trapped gas'
    ],
    doctorWarning: 'Seek medical evaluation for severe bloating with abdominal pain, bloating accompanied by weight loss, blood in stool, persistent vomiting, or if bloating is a new and worsening symptom.'
  },
  {
    problem: 'Body Pain',
    emoji: '😰',
    remedy: 'Epsom Salt Warm Bath and Turmeric Milk',
    preparation: 'Add 2 cups of Epsom salt to warm bathwater. Soak for 15–20 minutes. Pat dry gently. Follow with 1 glass of warm turmeric milk: half teaspoon turmeric, pinch of black pepper, and honey in warm milk. Rest afterwards.',
    science: 'Epsom salt contains magnesium sulfate which has traditionally been used for muscle relaxation. Magnesium plays a role in muscle contraction and relaxation. Turmeric milk provides curcumin which may support the body natural anti-inflammatory response relevant to muscle soreness.',
    activeCompounds: ['Magnesium Sulfate', 'Curcumin', 'Piperine', 'Calcium'],
    nutritionBenefit: 'Magnesium is involved in over 300 biochemical reactions including muscle function. Many people are deficient in magnesium. Include magnesium-rich foods: dark leafy greens, nuts, seeds, and dark chocolate.',
    lifestyleTips: [
      'Gentle stretching before and after any physical activity',
      'Ensure adequate protein intake for muscle repair',
      'Stay well hydrated — dehydration worsens muscle cramps',
      'Apply alternating warm and cool compresses for sore muscles'
    ],
    doctorWarning: 'Seek immediate medical care for chest pain even if it feels like muscle pain, severe localised pain after injury, pain with swelling and bruising, or body pain accompanied by fever, rash, or difficulty moving a limb.'
  },
  {
    problem: 'Seasonal Allergy',
    emoji: '🤧',
    remedy: 'Tulsi, Honey, and Black Pepper Tea',
    preparation: 'Boil 10 fresh Tulsi leaves with 5 black pepper corns in 1.5 cups of water for 8 minutes. Strain into a cup. Add 1 teaspoon of raw local honey. Drink warm once or twice daily during allergy season.',
    science: 'Tulsi contains phytochemicals including ursolic acid and rosmarinic acid that may modulate the immune response and have anti-inflammatory properties. Black pepper piperine may enhance bioavailability of active compounds.',
    activeCompounds: ['Ursolic Acid', 'Rosmarinic Acid', 'Piperine', 'Quercetin'],
    nutritionBenefit: 'This tea provides antioxidants that may support immune modulation. Vitamin C from tulsi may support immune function. Quercetin found in tulsi is a natural flavonoid that may help stabilise cells involved in allergic responses.',
    lifestyleTips: [
      'Keep windows closed during high pollen times early morning',
      'Shower after being outdoors to remove pollen from hair and skin',
      'Wear a mask outdoors during high pollution or pollen days',
      'Keep the home clean and dust-free to reduce indoor allergens'
    ],
    doctorWarning: 'Anaphylaxis is a life-threatening allergic emergency. Signs: sudden throat swelling, difficulty breathing, drop in blood pressure, rapid heartbeat, or loss of consciousness. Call emergency services immediately.'
  },
  {
    problem: 'Mild Stress',
    emoji: '😔',
    remedy: 'Ashwagandha and Brahmi Tea with Deep Breathing',
    preparation: 'Mix quarter teaspoon each of Ashwagandha powder and Brahmi powder in 1 cup of warm milk or water. Add honey to taste. Drink in the evening. Combine with 5 minutes of deep breathing: inhale for 4 counts, hold for 4 counts, exhale for 6 counts. Repeat 8–10 times.',
    science: 'Ashwagandha is classified as an adaptogen and may help the body adapt to stress. Withanolides may support the regulation of cortisol, the primary stress hormone. Brahmi has been traditionally used to support cognitive function and calmness. Diaphragmatic breathing activates the parasympathetic nervous system.',
    activeCompounds: ['Withanolides', 'Bacosides', 'Sitoindosides', 'GABA Modulators'],
    nutritionBenefit: 'Magnesium found in dark chocolate, nuts, and leafy greens is the relaxation mineral and deficiency is linked to anxiety. B vitamins support nervous system function. Omega-3 fatty acids from walnuts and flaxseeds may support mood regulation.',
    lifestyleTips: [
      'Practice 10 minutes of mindfulness or meditation daily',
      'Exercise regularly — even a 20-minute walk reduces stress hormones',
      'Maintain social connections — talk to a trusted friend or family member',
      'Limit news and social media consumption if they increase anxiety'
    ],
    doctorWarning: 'Seek professional mental health support for severe anxiety, panic attacks, persistent depression, thoughts of self-harm, or stress that significantly impairs daily functioning. Mental health conditions respond well to professional treatment.'
  }
];

module.exports = remediesData;