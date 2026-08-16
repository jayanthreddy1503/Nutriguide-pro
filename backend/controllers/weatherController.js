const WeatherLog = require('../models/WeatherLog');

const LAT = 14.6819;
const LON = 77.6006;

// ── Get mode from temperature ──────────────────
function getMode(temp) {
  if (temp >= 38) return 'heatwave';
  if (temp >= 30) return 'hot';
  return 'normal';
}

// ── Get water goal from temperature ───────────
function getWaterGoal(temp) {
  if (temp >= 38) return { amount: '4.0–4.5 L', ml: 4250 };
  if (temp >= 30) return { amount: '3.5–4.0 L', ml: 3750 };
  return             { amount: '3.0 L',       ml: 3000 };
}

// ── WMO weather code to text ───────────────────
function getConditionText(code) {
  const codes = {
    0:'Clear Sky', 1:'Mainly Clear', 2:'Partly Cloudy',
    3:'Overcast', 45:'Fog', 48:'Fog',
    51:'Light Drizzle', 53:'Moderate Drizzle',
    55:'Heavy Drizzle', 61:'Light Rain',
    63:'Moderate Rain', 65:'Heavy Rain',
    71:'Light Snow', 73:'Moderate Snow',
    80:'Rain Showers', 81:'Rain Showers',
    95:'Thunderstorm', 96:'Thunderstorm',
    99:'Thunderstorm'
  };
  return codes[code] || 'Clear';
}

// ── GET /api/weather/current ───────────────────
const getCurrentWeather = async (req, res) => {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${LAT}&longitude=${LON}` +
      `&current=temperature_2m,relative_humidity_2m,` +
      `apparent_temperature,weather_code` +
      `&timezone=Asia%2FKolkata`;

    // Fetch from Open-Meteo
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Open-Meteo API error: ' + response.status);
    }

    const apiData = await response.json();
    const curr    = apiData.current;

    if (!curr) {
      throw new Error('No current weather data in response');
    }

    const temp      = Math.round(curr.temperature_2m);
    const feelsLike = Math.round(curr.apparent_temperature);
    const humidity  = Math.round(curr.relative_humidity_2m);
    const code      = curr.weather_code;
    const condition = getConditionText(code);
    const mode      = getMode(temp);
    const goal      = getWaterGoal(temp);

    // Save to MongoDB
    const log = await WeatherLog.create({
      temperature:  temp,
      feelsLike:    feelsLike,
      humidity:     humidity,
      condition:    condition,
      weatherCode:  code,
      mode:         mode,
      waterGoalMl:  goal.ml,
      location: {
        name: 'Anantapur',
        lat:  LAT,
        lon:  LON
      },
      fetchedAt: new Date()
    });

    return res.status(200).json({
      success: true,
      data: {
        temperature:  temp,
        feelsLike:    feelsLike,
        humidity:     humidity,
        condition:    condition,
        mode:         mode,
        waterGoal:    goal,
        location:     'Anantapur, Andhra Pradesh',
        fetchedAt:    log.fetchedAt,
        logId:        log._id
      }
    });

  } catch (error) {
    console.error('Weather fetch error:', error.message);

    // Return fallback — do NOT crash page
    return res.status(200).json({
      success:  false,
      fallback: true,
      message:  'Weather data currently unavailable. Showing general hydration advice.',
      data: {
        temperature:  null,
        feelsLike:    null,
        humidity:     null,
        condition:    'Unavailable',
        mode:         'normal',
        waterGoal:    { amount: '3.0 L', ml: 3000 },
        location:     'Anantapur, Andhra Pradesh',
        fetchedAt:    new Date()
      }
    });
  }
};

// ── GET /api/weather/history ───────────────────
const getWeatherHistory = async (req, res) => {
  try {
    const logs = await WeatherLog
      .find()
      .sort({ fetchedAt: -1 })
      .limit(24)
      .select('temperature humidity condition mode fetchedAt');

    return res.status(200).json({
      success: true,
      count:   logs.length,
      data:    logs
    });

  } catch (error) {
    console.error('Weather history error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error.'
    });
  }
};

module.exports = {
  getCurrentWeather,
  getWeatherHistory
};