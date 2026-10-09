const express = require("express");
const router = express.Router();

const {
  register,
  login,
  refreshToken,
  logout,
  me
} = require("../controllers/auth.controller");

const {
  registerValidator,
  loginValidator
} = require("../validators/auth.validator");

const validate = require("../middleware/validate.middleware");
const authenticate = require("../middleware/auth.middleware");

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerValidator, validate, register);

// @route   POST /api/auth/login
// @desc    Authenticate user & issue access + refresh tokens
// @access  Public
router.post("/login", loginValidator, validate, login);

// @route   POST /api/auth/refresh-token
// @desc    Issue a new access token using a valid refresh token
// @access  Public (requires refresh token)
router.post("/refresh-token", refreshToken);

// @route   POST /api/auth/logout
// @desc    Invalidate refresh token and clear cookies
// @access  Authenticated
router.post("/logout", authenticate, logout);

// @route   GET /api/auth/me
// @desc    Get currently logged-in user profile
// @access  Authenticated
router.get("/me", authenticate, me);

module.exports = router;
