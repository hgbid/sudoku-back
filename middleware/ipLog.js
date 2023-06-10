const logger = require("../utils/logger");

function logIpMiddleware(req, res, next) {
  console.log("in here");
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  logger.info(`Request from IP: ${ip}`);
  next();
}
module.exports = logIpMiddleware;
