const NutritionLog = require('../models/NutritionLog');

// ── Daily Values ───────────────────────────────
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

// ── Rating Logic ───────────────────────────────
function rateNutrient(key, value) {
  switch (key) {
    case 'calories':
      return value > 500 ? 'occasional' : value > 300 ? 'good' : 'excellent';
    case 'protein':
      return value >= 10 ? 'excellent' : value >= 5 ? 'good' : 'occasional';
    case 'fat':
      return value > 20 ? 'occasional' : value > 10 ? 'good' : 'excellent';
    case 'carbs':
      return value > 60 ? 'occasional' : value > 30 ? 'good' : 'excellent';
    case 'sugar':
      return value > 20 ? 'high-sugar' : value > 10 ? 'occasional' : value > 5 ? 'good' : 'excellent';
    case 'addedSugar':
      return value > 12 ? 'high-sugar' : value > 6 ? 'occasional' : 'good';
    case 'fiber':
      return value >= 5 ? 'excellent' : value >= 2 ? 'good' : 'occasional';
    case 'sodium':
      return value > 600 ? 'high-sodium' : value > 300 ? 'occasional' : 'good';
    case 'calcium':
      return value >= 300 ? 'excellent' : value >= 100 ? 'good' : 'occasional';
    case 'iron':
      return value >= 5 ? 'excellent' : value >= 2 ? 'good' : 'occasional';
    case 'potassium':
      return value >= 500 ? 'excellent' : value >= 200 ? 'good' : 'occasional';
    case 'vitc':
      return value >= 20 ? 'excellent' : value >= 10 ? 'good' : 'occasional';
    default:
      return 'good';
  }
}

// ── Calculate Overall Score ────────────────────
function calcScore(ratings) {
  const scoreMap = {
    'excellent':   100,
    'good':        70,
    'occasional':  40,
    'high-sugar':  20,
    'high-sodium': 25
  };
  const vals = Object.values(ratings).filter(v => v !== null);
  if (!vals.length) return 0;
  const total = vals.reduce((sum, r) => sum + (scoreMap[r] || 50), 0);
  return Math.round(total / vals.length);
}

// ── Get Alternatives ───────────────────────────
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

// ── POST /api/nutrition-decoder/decode ─────────
const decodeLabel = async (req, res) => {
  try {
    const { nutrients, foodName } = req.body;

    // Validate — at least one nutrient required
    if (!nutrients || typeof nutrients !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one nutrition value.'
      });
    }

    const validKeys = [
      'calories','protein','fat','carbs','sugar',
      'addedSugar','fiber','sodium','calcium',
      'iron','potassium','vitc'
    ];

    // Filter only valid keys with valid values
    const cleanNutrients = {};
    const ratings        = {};

    for (const key of validKeys) {
      const val = parseFloat(nutrients[key]);
      if (!isNaN(val) && val >= 0) {
        cleanNutrients[key] = val;
        ratings[key]        = rateNutrient(key, val);
      }
    }

    if (Object.keys(cleanNutrients).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid nutrition values provided.'
      });
    }

    // Cross validation
    if (
      cleanNutrients.addedSugar !== undefined &&
      cleanNutrients.sugar      !== undefined
    ) {
      if (cleanNutrients.addedSugar > cleanNutrients.sugar) {
        return res.status(400).json({
          success: false,
          message: `Added Sugar (${cleanNutrients.addedSugar}g) cannot be more than Total Sugar (${cleanNutrients.sugar}g).`
        });
      }
    }

    const overallScore   = calcScore(ratings);
    const alternatives   = getAlternatives(ratings);

    // Save to MongoDB
    const log = await NutritionLog.create({
      userId:       req.user._id,
      nutrients:    cleanNutrients,
      ratings:      ratings,
      overallScore: overallScore,
      alternatives: alternatives,
      foodName:     foodName || 'Unknown Food'
    });

    return res.status(201).json({
      success:      true,
      message:      'Label decoded and saved successfully.',
      data: {
        logId:        log._id,
        nutrients:    cleanNutrients,
        ratings:      ratings,
        overallScore: overallScore,
        alternatives: alternatives,
        foodName:     log.foodName,
        createdAt:    log.createdAt
      }
    });

  } catch (error) {
    console.error('Decode error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
};

// ── GET /api/nutrition-decoder/history ─────────
const getHistory = async (req, res) => {
  try {
    const logs = await NutritionLog
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('foodName overallScore ratings createdAt');

    return res.status(200).json({
      success: true,
      count:   logs.length,
      data:    logs
    });

  } catch (error) {
    console.error('History error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
};

// ── DELETE /api/nutrition-decoder/history/:id ──
const deleteLog = async (req, res) => {
  try {
    const log = await NutritionLog.findOne({
      _id:    req.params.id,
      userId: req.user._id
    });

    if (!log) {
      return res.status(404).json({
        success: false,
        message: 'Log not found.'
      });
    }

    await NutritionLog.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Log deleted successfully.'
    });

  } catch (error) {
    console.error('Delete error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
};

module.exports = {
  decodeLabel,
  getHistory,
  deleteLog
};