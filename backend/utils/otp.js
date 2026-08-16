const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// Generates a cryptographically-secure 6-digit numeric OTP (000000-999999).
// crypto.randomInt is uniform and non-predictable, unlike Math.random().
function generateOTP() {
  return crypto.randomInt(0, 1000000).toString().padStart(6, "0");
}

const OTP_TTL_MINUTES = 10;
const OTP_RESEND_COOLDOWN_SECONDS = 60;

// Hashes the OTP before it's stored, the same way we hash passwords.
// This means a database leak alone can never be used to complete a login.
async function hashOTP(rawOtp) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(rawOtp, salt);
}

async function compareOTP(rawOtp, hashedOtp) {
  if (!hashedOtp) return false;
  return bcrypt.compare(rawOtp, hashedOtp);
}

module.exports = {
  generateOTP,
  hashOTP,
  compareOTP,
  OTP_TTL_MINUTES,
  OTP_RESEND_COOLDOWN_SECONDS
};
