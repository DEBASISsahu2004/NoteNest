const JWT = require("jsonwebtoken");

const generateAccessToken = (user, res) => {
  // Generate JWT Token
  const accessToken = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Storing the token in cookie
  res.cookie("JWT_Token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  console.log("Token stored in cookie");
};

const verifyAccessToken = (token) => {
  console.log("Verifying token");
  console.log("Token: ", token);
  return JWT.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
