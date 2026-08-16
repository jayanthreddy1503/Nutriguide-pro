const express = require("express");

const router = express.Router();

const {
    saveProfile,
    getProfile
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");

router.post("/save", protect, saveProfile);
router.get("/get", protect, getProfile);

module.exports = router;
