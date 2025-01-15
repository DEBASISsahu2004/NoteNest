const JWT = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (user) => {
  return JWT.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

const verifyAccessToken = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateAccessToken, verifyAccessToken };
