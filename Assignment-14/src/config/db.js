const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoURI);
    console.log(`[MongoDB] Connected to database: ${conn.connection.name} @ ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Error] Connection failed: ${error.message}`);
    console.log("[MongoDB Note] Make sure MongoDB server is running locally on 127.0.0.1:27017 or update MONGODB_URI in .env");
  }
};

module.exports = connectDB;
