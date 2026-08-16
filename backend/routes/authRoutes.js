const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  registerUser,
  verifyOtp,
  resendOtp,
  loginUser,
  logoutUser,
  getMe,
  getStats,
  handleOAuthSuccess
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// --- Email / password + OTP ---
router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// --- Session ---
router.get("/me", protect, getMe);
router.get("/stats", getStats);

// --- Google OAuth 2.0 ---
// Step 1: redirect the browser to Google's consent screen.
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false // stateless — see config/passport.js
  })
);

// Step 2: Google redirects back here with a code; Passport exchanges it and
// runs the strategy callback in config/passport.js, which resolves req.user.
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL || ""}/login.html?error=oauth`
  }),
  handleOAuthSuccess
);

module.exports = router;
