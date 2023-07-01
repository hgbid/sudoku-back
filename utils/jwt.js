const jwt = require("jsonwebtoken");

const SECRATE = process.env.SECRATE_JWT;
const generateToken = (payload) => {
  const token = jwt.sign({ payload: payload }, SECRATE, { expiresIn: "1w" });
  return token;
};

const decodeToken = (token) => {
  const result = jwt.decode(token);
  return result.payload;
};

module.exports = { generateToken, decodeToken };
