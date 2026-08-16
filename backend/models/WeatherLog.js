const mongoose = require('mongoose');

const weatherLogSchema = new mongoose.Schema(
  {
    temperature:  { type: Number, required: true },
    feelsLike:    { type: Number, default: null  },
    humidity:     { type: Number, default: null  },
    condition:    { type: String, default: 'Clear' },
    weatherCode:  { type: Number, default: 0 },
    mode: {
      type: String,
      enum: ['normal', 'hot', 'heatwave'],
      default: 'normal'
    },
    waterGoalMl:  { type: Number, default: 3000 },
    location: {
      name: { type: String, default: 'Anantapur' },
      lat:  { type: Number, default: 14.6819 },
      lon:  { type: Number, default: 77.6006 }
    },
    fetchedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('WeatherLog', weatherLogSchema);