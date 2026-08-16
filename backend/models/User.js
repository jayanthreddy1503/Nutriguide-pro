const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    // Not required at the schema level because OAuth users (Google)
    // never set a local password. `registerUser` enforces it for email/password sign-ups.
    password: {
      type: String,
      select: false // never returned by default queries
    },

    // Which mechanism created this account. Useful for UI ("Sign in with Google
    // originally") and to stop OAuth-only accounts from using the password login route.
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    },

    // --- Email verification (OTP) ---
    isVerified: {
      type: Boolean,
      default: false
    },
    otp: {
      // We store a bcrypt HASH of the OTP, never the raw code. Even if the
      // database leaked, the OTPs could not be replayed.
      code: { type: String, select: false },
      expiresAt: { type: Date, select: false },
      lastSentAt: { type: Date, select: false }, // used for resend cooldown
      attempts: { type: Number, default: 0, select: false } // failed verify attempts
    },

    // --- OAuth identifiers ---
    googleId: {
      type: String,
      unique: true,
      sparse: true // allows many docs with no googleId at all
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
