const JWT = require("jsonwebtoken");

const generateAccessToken = (user, res) => {
  // Generate JWT Token
  const accessToken = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Storing the token in cookie
  res.cookie("JWT_Token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: "Strict",
  });
};

const verifyAccessToken = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
