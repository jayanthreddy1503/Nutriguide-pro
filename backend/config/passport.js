// Passport strategy configuration for Google OAuth 2.0.
//
// We deliberately run passport in fully STATELESS mode ({ session: false }
// wherever we call passport.authenticate(...) in authRoutes.js). That means:
//   - No express-session / server-side session store is required.
//   - Passport just runs the OAuth handshake and hands us the profile in the
//     callback route, where WE mint our own httpOnly JWT cookie (see token.js).
// This keeps the whole app on a single, consistent auth mechanism (JWT cookie)
// instead of mixing sessions and tokens.
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

// Finds an existing user for this OAuth identity, or creates a brand-new one.
// OAuth accounts are auto-verified (isVerified: true) because the provider
// (Google) has already confirmed the person owns that email.
async function findOrCreateOAuthUser({ provider, providerId, name, email, avatar }) {
  const idField = "googleId";

  // 1) Already linked to this exact provider account? Just log them in.
  let user = await User.findOne({ [idField]: providerId });
  if (user) return user;

  // 2) An account with this email already exists (e.g. they signed up with a
  //    password first). Link the OAuth id to that existing account rather
  //    than creating a duplicate.
  if (email) {
    user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      user[idField] = providerId;
      user.isVerified = true; // provider-verified email is good enough
      if (!user.avatar && avatar) user.avatar = avatar;
      await user.save();
      return user;
    }
  }

  // 3) Brand new user.
  user = await User.create({
    name: name || "New User",
    email: email ? email.toLowerCase() : undefined,
    [idField]: providerId,
    authProvider: provider,
    avatar,
    isVerified: true
  });

  return user;
}

function configurePassport() {
  // --- Google OAuth 2.0 ---
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL // e.g. http://localhost:3000/api/auth/google/callback
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails && profile.emails[0] && profile.emails[0].value;
            const avatar = profile.photos && profile.photos[0] && profile.photos[0].value;

            const user = await findOrCreateOAuthUser({
              provider: "google",
              providerId: profile.id,
              name: profile.displayName,
              email,
              avatar
            });

            return done(null, user);
          } catch (err) {
            return done(err);
          }
        }
      )
    );
  } else {
    console.warn("⚠️  Google OAuth not configured (missing GOOGLE_CLIENT_ID/SECRET). /api/auth/google will 500.");
  }
}

module.exports = configurePassport;
