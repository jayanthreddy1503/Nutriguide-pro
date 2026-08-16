const express    = require('express');
const router     = express.Router();
const {
  getCurrentWeather,
  getWeatherHistory
} = require('../controllers/weatherController');

// GET /api/weather/current
// Public — no auth needed
router.get('/current', getCurrentWeather);

// GET /api/weather/history
// Public — last 24 fetches
router.get('/history', getWeatherHistory);

module.exports = router;