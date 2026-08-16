const mongoose = require('mongoose');

const nutritionLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    nutrients: {
      calories:   { type: Number, default: null },
      protein:    { type: Number, default: null },
      fat:        { type: Number, default: null },
      carbs:      { type: Number, default: null },
      sugar:      { type: Number, default: null },
      addedSugar: { type: Number, default: null },
      fiber:      { type: Number, default: null },
      sodium:     { type: Number, default: null },
      calcium:    { type: Number, default: null },
      iron:       { type: Number, default: null },
      potassium:  { type: Number, default: null },
      vitc:       { type: Number, default: null }
    },
    ratings: {
      calories:   { type: String, default: null },
      protein:    { type: String, default: null },
      fat:        { type: String, default: null },
      carbs:      { type: String, default: null },
      sugar:      { type: String, default: null },
      addedSugar: { type: String, default: null },
      fiber:      { type: String, default: null },
      sodium:     { type: String, default: null },
      calcium:    { type: String, default: null },
      iron:       { type: String, default: null },
      potassium:  { type: String, default: null },
      vitc:       { type: String, default: null }
    },
    overallScore: {
      type: Number,
      default: 0
    },
    alternatives: [
      {
        emoji: { type: String },
        name:  { type: String }
      }
    ],
    foodName: {
      type: String,
      default: 'Unknown Food'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('NutritionLog', nutritionLogSchema);