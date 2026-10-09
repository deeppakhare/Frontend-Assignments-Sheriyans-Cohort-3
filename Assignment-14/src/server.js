const app = require("./app/app");
const config = require("./config/config");
const connectDB = require("./config/db");

// Connect to MongoDB & Start Server
const startServer = async () => {
  await connectDB();

  const server = app.listen(config.port, () => {
    console.log(`=================================================`);
    console.log(`🚀 Server running in [${config.nodeEnv}] mode`);
    console.log(`🌐 Server URL: http://localhost:${config.port}`);
    console.log(`=================================================`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.error("[Unhandled Rejection Error]:", err.message);
  });
};

startServer();
