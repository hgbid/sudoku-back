const { generateToken } = require("../../utils/jwt");
const logger = require("../../utils/logger");

exports.login = async (req, res, next) => {
  logger.info("login called");

  const { password } = req.body;
  try {
    const PASSWORD = process.env.INST_PASSWORD;
    if (!PASSWORD || password !== PASSWORD) {
      console.log(password, PASSWORD);
      logger.info("Invalid password");
      res.status(401).json({
        message: "Login not successful",
        error: "Invalid password",
      });
    } else {
      logger.info("Login successful");
      res.status(200).json({
        message: "Login successful",
        token: generateToken("username"),
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
