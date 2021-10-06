const jwt = require("jsonwebtoken");
const { SECRETKEY } = require("./env");

const secret = SECRETKEY;

const generateJWTToken = (id) => {
  const token = jwt.sign({ sub: id }, secret, { expiresIn: "1d" });
  return token;
};

module.exports = generateJWTToken;
