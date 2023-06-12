const mongoose = require("mongoose");
const logger = require("./utils/logger");
require("dotenv").config();

async function connectToDB() {
  const uri = process.env.MONGODB_URI;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to MongoDB successfully");
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`, {
      service: "connect-to-DB",
    });
  }
}
module.exports = { connectToDB };
