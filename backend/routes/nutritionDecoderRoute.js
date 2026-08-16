const express    = require('express');
const router     = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  decodeLabel,
  getHistory,
  deleteLog
} = require('../controllers/nutritionDecoderController');

// POST   /api/nutrition-decoder/decode
// Protected — user must be logged in
router.post('/decode', protect, decodeLabel);

// GET    /api/nutrition-decoder/history
// Protected — get last 10 decoded labels
router.get('/history', protect, getHistory);

// DELETE /api/nutrition-decoder/history/:id
// Protected — delete a specific log
router.delete('/history/:id', protect, deleteLog);

module.exports = router;