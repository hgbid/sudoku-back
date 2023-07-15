const { decodeToken } = require("../utils/jwt");
const logger = require("../utils/logger");
const logService = { service: "authorization" };

const auth = (req, res, next) => {
  try {
    console.log("in auth")
    let token = req.headers.authorization;
    if (!token) {
      logger.error(`Unauthorized - There is no token`, logService);
      return res.sendStatus(401);
    }

    const payload = decodeToken(token);
    res.locals.user = payload;
    logger.info(`Authorizetion succeed`, logService);
    next();
  } catch (error) {
    logger.error(`Unauthorized: ${error}`, logService);
    return res.sendStatus(401);
  }
};

module.exports = { auth };
