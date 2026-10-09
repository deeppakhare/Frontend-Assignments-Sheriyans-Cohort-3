const jwt = require("jsonwebtoken");
const config = require("../config/config");

/**
 * Authenticate Middleware
 * Reads Bearer token from Authorization header, verifies JWT, and attaches req.user
 */
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Bearer token missing in Authorization header."
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.accessTokenSecret);
    req.user = decoded; // Contains userId, email, etc.
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token has expired. Please refresh your token.",
        code: "TOKEN_EXPIRED"
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid access token.",
      code: "INVALID_TOKEN"
    });
  }
};

module.exports = authenticate;
