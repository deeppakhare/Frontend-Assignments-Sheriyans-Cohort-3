const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

module.exports = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sheryians_auth_crud",
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "default_access_secret_key_change_in_prod",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret_key_change_in_prod",
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  nodeEnv: process.env.NODE_ENV || "development"
};
