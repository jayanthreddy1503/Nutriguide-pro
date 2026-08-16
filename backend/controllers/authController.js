const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { issueAuthCookie, clearAuthCookie } = require("../utils/token");
const { sendOtpEmail } = require("../utils/sendEmail");
const {
  generateOTP,
  hashOTP,
  compareOTP,
  OTP_TTL_MINUTES,
  OTP_RESEND_COOLDOWN_SECONDS
} = require("../utils/otp");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Small helper — the shape of "user" we're willing to send to the client.
// Never include password or otp fields, even hashed ones.
function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
    avatar: user.avatar || null,
    authProvider: user.authProvider
  };
}

// Generates a fresh OTP, hashes it, saves it on the user doc, and emails it.
async function issueAndSendOtp(user) {
  const rawOtp = generateOTP();
  user.otp = {
    code: await hashOTP(rawOtp),
    expiresAt: new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000),
    lastSentAt: new Date(),
    attempts: 0
  };
  await user.save();

  await sendOtpEmail({ to: user.email, name: user.name, otp: rawOtp });
}

// ---------------------------------------------------------------------------
// POST /api/auth/register
// ---------------------------------------------------------------------------
exports.registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = (name || "").trim();
    email = (email || "").trim().toLowerCase();
    password = (password || "").trim();

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are all required."
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long."
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If they signed up before but never verified, let them pick up where
      // they left off instead of being permanently blocked from registering.
      if (!existingUser.isVerified) {
        await issueAndSendOtp(existingUser);
        return res.status(200).json({
          success: true,
          requiresVerification: true,
          message: "An unverified account already exists for this email. We've sent a new verification code.",
          email: existingUser.email
        });
      }
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists."
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      authProvider: "local",
      isVerified: false
    });

    await issueAndSendOtp(user);

    // NOTE: no auth cookie yet — the account isn't usable until OTP verification.
    res.status(201).json({
      success: true,
      requiresVerification: true,
      message: "Account created. We've sent a 6-digit verification code to your email.",
      email: user.email
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists."
      });
    }

    console.error("registerUser error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

// ---------------------------------------------------------------------------
// POST /api/auth/verify-otp
// ---------------------------------------------------------------------------
exports.verifyOtp = async (req, res) => {
  try {
    let { email, otp } = req.body;
    email = (email || "").trim().toLowerCase();
    otp = (otp || "").trim();

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required."
      });
    }

    const user = await User.findOne({ email }).select("+otp.code +otp.expiresAt +otp.attempts");

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or OTP." });
    }

    if (user.isVerified) {
      return res.status(200).json({ success: true, message: "Account already verified. Please log in." });
    }

    if (!user.otp || !user.otp.code || !user.otp.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "No pending verification code. Please request a new one."
      });
    }

    // Basic brute-force guard: lock out after too many wrong attempts on this code.
    if (user.otp.attempts >= 5) {
      return res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Please request a new code."
      });
    }

    if (user.otp.expiresAt.getTime() < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "This code has expired. Please request a new one."
      });
    }

    const isMatch = await compareOTP(otp, user.otp.code);

    if (!isMatch) {
      user.otp.attempts = (user.otp.attempts || 0) + 1;
      await user.save();
      return res.status(400).json({ success: false, message: "Incorrect code. Please try again." });
    }

    user.isVerified = true;
    user.otp = undefined; // clear it — one-time use
    await user.save();

    issueAuthCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      user: publicUser(user)
    });
  } catch (error) {
    console.error("verifyOtp error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// ---------------------------------------------------------------------------
// POST /api/auth/resend-otp
// ---------------------------------------------------------------------------
exports.resendOtp = async (req, res) => {
  try {
    let { email } = req.body;
    email = (email || "").trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ success: false, message: "A valid email is required." });
    }

    const user = await User.findOne({ email }).select("+otp.lastSentAt");

    // Don't reveal whether the account exists — respond the same way either way.
    if (!user || user.isVerified) {
      return res.status(200).json({
        success: true,
        message: "If an unverified account exists for this email, a new code has been sent."
      });
    }

    if (user.otp && user.otp.lastSentAt) {
      const secondsSinceLastSend = (Date.now() - user.otp.lastSentAt.getTime()) / 1000;
      if (secondsSinceLastSend < OTP_RESEND_COOLDOWN_SECONDS) {
        return res.status(429).json({
          success: false,
          message: `Please wait ${Math.ceil(OTP_RESEND_COOLDOWN_SECONDS - secondsSinceLastSend)}s before requesting another code.`
        });
      }
    }

    await issueAndSendOtp(user);

    res.status(200).json({
      success: true,
      message: "A new verification code has been sent to your email."
    });
  } catch (error) {
    console.error("resendOtp error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// ---------------------------------------------------------------------------
// POST /api/auth/login
// ---------------------------------------------------------------------------
exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = (email || "").trim().toLowerCase();
    password = (password || "").trim();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both email and password."
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.password) {
      // Either no account, or an OAuth-only account with no local password.
      return res.status(400).json({
        success: false,
        message: "No password-based account found with this email. Try signing in with Google."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Please try again."
      });
    }

    if (!user.isVerified) {
      // Give them a fresh code right away so the "verify" screen is immediately usable.
      await issueAndSendOtp(user);
      return res.status(403).json({
        success: false,
        requiresVerification: true,
        email: user.email,
        message: "Please verify your email before logging in. We've sent a new code."
      });
    }

    issueAuthCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: publicUser(user)
    });
  } catch (error) {
    console.error("loginUser error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

// ---------------------------------------------------------------------------
// POST /api/auth/logout
// ---------------------------------------------------------------------------
exports.logoutUser = async (req, res) => {
  clearAuthCookie(res);
  res.status(200).json({ success: true, message: "Logged out." });
};

// ---------------------------------------------------------------------------
// GET /api/auth/me  (protected — validates the cookie and returns the user)
// ---------------------------------------------------------------------------
exports.getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: publicUser(req.user)
  });
};

// ---------------------------------------------------------------------------
// GET /api/auth/stats  (public, decorative platform stats)
// ---------------------------------------------------------------------------
exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({ isVerified: true });

    res.status(200).json({
      success: true,
      users: userCount,
      successRate: 98,
      dietPlans: 50
    });
  } catch (error) {
    console.error("getStats error:", error);
    res.status(500).json({
      success: false,
      message: "Could not load stats."
    });
  }
};

// ---------------------------------------------------------------------------
// Called from the Google OAuth callback route once Passport has
// resolved (or created) the user. Mints our own JWT cookie and redirects
// back into the frontend app — the OAuth flow ends up looking, from the
// browser's perspective, just like a normal login.
// ---------------------------------------------------------------------------
exports.handleOAuthSuccess = (req, res) => {
  const user = req.user; // set by Passport's strategy `done(null, user)`
  issueAuthCookie(res, user._id);

  const frontendUrl = process.env.CLIENT_URL || "http://localhost:3000";
  res.redirect(`${frontendUrl}/oauth-success.html`);
};
