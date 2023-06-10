const mongoose = require("mongoose");
const logger = require("./utils/logger");

async function connectToDB() {
  const uri =
    "mongodb+srv://nitzanim:1234@cluster0.3aprqan.mongodb.net/nitzanim";

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
