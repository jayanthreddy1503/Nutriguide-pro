const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

dotenv.config();

const connectDB = require("./config/db.js");
const configurePassport = require("./config/passport.js");

const authRoutes = require("./routes/authRoutes");
const profileRoute = require("./routes/profileRoute");
const aiRoutes = require("./routes/aiRoutes");
const nutritionDecoderRoute = require("./routes/nutritionDecoderRoute");
const weatherRoute = require("./routes/weatherRoute");
const remedyRoute = require("./routes/remedyRoute");

connectDB();

const app = express();

// Trust the first proxy hop (Render/Railway/Heroku/behind Nginx) so that
// `secure` cookies and `req.protocol` work correctly behind HTTPS-terminating
// load balancers. Harmless locally.
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- CORS ---
// credentials:true is required for the browser to send/receive the httpOnly
// auth cookie on cross-origin requests. When credentials are involved, the
// origin CANNOT be "*" — it must be an explicit, echoed origin.
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin/non-browser requests (no Origin header) and any
      // origin explicitly listed in CLIENT_URL.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);

configurePassport();
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoute);
app.use("/api/ai", aiRoutes);
app.use("/api/nutrition-decoder", nutritionDecoderRoute);
app.use("/api/weather", weatherRoute);
app.use("/api/remedies", remedyRoute);

// This is an API-only server — the frontend (public/) is deployed
// separately as a static site. See ../frontend and CLIENT_URL below.
app.get("/", (req, res) => {
  res.json({ success: true, message: "NutriGuide Pro API is running." });
});

// Centralized error handler — catches CORS rejections and anything else
// thrown/passed to next(err) so the client always gets clean JSON.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong on the server."
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
