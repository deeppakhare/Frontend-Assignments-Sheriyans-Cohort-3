const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../config/config");

/**
 * Generate Access & Refresh Tokens
 */
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email, name: user.name },
    config.accessTokenSecret,
    { expiresIn: config.accessTokenExpiry }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    config.refreshTokenSecret,
    { expiresIn: config.refreshTokenExpiry }
  );

  return { accessToken, refreshToken };
};

/**
 * Set HTTP-Only Cookie Helper
 */
const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

/**
 * Register Controller
 * POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
        errors: [
          {
            field: "email",
            message: "Email is already registered",
            value: email
          }
        ]
      });
    }

    // Create user
    const user = new User({ name, email, password });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: user.toJSON()
    });
  } catch (error) {
    console.error("[Register Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message
    });
  }
};

/**
 * Login Controller
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Save refresh token in DB for revocation
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookie
    setRefreshTokenCookie(res, refreshToken);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken, // Documented in body as well
      user: user.toJSON()
    });
  } catch (error) {
    console.error("[Login Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message
    });
  }
};

/**
 * Refresh Token Controller
 * POST /api/auth/refresh-token
 */
const refreshToken = async (req, res) => {
  try {
    const token =
      req.cookies?.refreshToken ||
      req.body?.refreshToken ||
      req.headers["x-refresh-token"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required"
      });
    }

    // Verify JWT signature
    let decoded;
    try {
      decoded = jwt.verify(token, config.refreshTokenSecret);
    } catch (err) {
      res.clearCookie("refreshToken");
      return res.status(401).json({
        success: false,
        message: "Expired or invalid refresh token. Please log in again."
      });
    }

    // Verify token match in DB
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== token) {
      res.clearCookie("refreshToken");
      return res.status(403).json({
        success: false,
        message: "Refresh token has been revoked or is invalid. Please log in again."
      });
    }

    // Rotate tokens
    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    setRefreshTokenCookie(res, tokens.refreshToken);

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: user.toJSON()
    });
  } catch (error) {
    console.error("[Refresh Token Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during token refresh",
      error: error.message
    });
  }
};

/**
 * Logout Controller
 * POST /api/auth/logout
 */
const logout = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const token = req.cookies?.refreshToken || req.body?.refreshToken;

    if (userId) {
      await User.findByIdAndUpdate(userId, { refreshToken: null });
    } else if (token) {
      await User.findOneAndUpdate({ refreshToken: token }, { refreshToken: null });
    }

    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error("[Logout Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during logout",
      error: error.message
    });
  }
};

/**
 * Get Profile Controller
 * GET /api/auth/me
 */
const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found"
      });
    }

    return res.status(200).json({
      success: true,
      user: user.toJSON()
    });
  } catch (error) {
    console.error("[Me Profile Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching user profile",
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  me
};
