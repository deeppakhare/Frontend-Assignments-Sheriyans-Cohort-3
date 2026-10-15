const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("../routes/auth.routes");
const productRoutes = require("../routes/product.routes");

const app = express();

// Middlewares
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve Frontend Static Files
app.use(express.static(path.join(__dirname, "../../public")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Health Check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Fallback for API 404
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`
  });
});

// Serve frontend SPA fallback for non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("[Unhandled Express Error]:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

module.exports = app;