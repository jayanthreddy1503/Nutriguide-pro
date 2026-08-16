const HomeRemedy = require('../models/HomeRemedy');

// ── GET /api/remedies ──────────────────────────
// Returns all 20 remedies
const getAllRemedies = async (req, res) => {
  try {
    const remedies = await HomeRemedy
      .find()
      .select('problem emoji remedy')
      .sort({ problem: 1 });

    return res.status(200).json({
      success: true,
      count:   remedies.length,
      data:    remedies
    });

  } catch (error) {
    console.error('Get remedies error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
};

// ── GET /api/remedies/:problem ─────────────────
// Returns one specific remedy by problem name
const getRemedyByProblem = async (req, res) => {
  try {
    const problem = req.params.problem;

    const remedy = await HomeRemedy.findOne({
      problem: { $regex: new RegExp(`^${problem}$`, 'i') }
    });

    if (!remedy) {
      return res.status(404).json({
        success: false,
        message: `No remedy found for "${problem}".`
      });
    }

    return res.status(200).json({
      success: true,
      data:    remedy
    });

  } catch (error) {
    console.error('Get remedy error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
};

// ── GET /api/remedies/search?q=keyword ────────
// Search remedies by keyword
const searchRemedies = async (req, res) => {
  try {
    const keyword = req.query.q || '';

    const remedies = await HomeRemedy.find({
      $or: [
        { problem:  { $regex: keyword, $options: 'i' } },
        { remedy:   { $regex: keyword, $options: 'i' } },
        { science:  { $regex: keyword, $options: 'i' } }
      ]
    }).select('problem emoji remedy');

    return res.status(200).json({
      success: true,
      count:   remedies.length,
      data:    remedies
    });

  } catch (error) {
    console.error('Search error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
};

module.exports = {
  getAllRemedies,
  getRemedyByProblem,
  searchRemedies
};