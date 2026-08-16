const mongoose = require('mongoose');

const homeRemedySchema = new mongoose.Schema(
  {
    problem: {
      type:     String,
      required: true,
      unique:   true,
      trim:     true
    },
    emoji: {
      type:    String,
      default: '🌿'
    },
    remedy: {
      type:     String,
      required: true
    },
    preparation: {
      type:     String,
      required: true
    },
    science: {
      type:     String,
      required: true
    },
    activeCompounds: [
      { type: String }
    ],
    nutritionBenefit: {
      type:    String,
      default: ''
    },
    lifestyleTips: [
      { type: String }
    ],
    doctorWarning: {
      type:    String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('HomeRemedy', homeRemedySchema);