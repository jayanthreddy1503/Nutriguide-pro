const express = require("express");

const router = express.Router();

const { identifyFood } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

router.post("/identify-food", protect, identifyFood);

module.exports = router;
