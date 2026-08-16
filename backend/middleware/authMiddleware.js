const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Reads the JWT from the httpOnly cookie (primary path) and falls back to a
// Bearer header if present, so any non-browser client (e.g. mobile app,
// Postman, a future native client) can still authenticate without cookies.
const protect = async (req, res, next) => {
  try {
    let token = req.cookies && req.cookies.token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in again."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists. Please log in again."
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid. Please log in again."
    });
  }
};

module.exports = { protect };
