const express  = require('express');
const router   = express.Router();
const {
  getAllRemedies,
  getRemedyByProblem,
  searchRemedies
} = require('../controllers/remedyController');

// GET /api/remedies
router.get('/', getAllRemedies);

// GET /api/remedies/search?q=keyword
router.get('/search', searchRemedies);

// GET /api/remedies/:problem
router.get('/:problem', getRemedyByProblem);

module.exports = router;