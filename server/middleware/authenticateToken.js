const jwt = require("jsonwebtoken");
const { verifyAccessToken } = require("../utils/token");

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.JWT_Token;

  // If token is not found, return response with status 403 (Forbidden) and move the user to login page
  if (!token) { 
    console.log("token not found: ", token);
    return res.status(403).json({ message: "Token not found, Please login" }); 
  }

  // If token found verify the token and move forward
  try {
    const user = await verifyAccessToken(token);
    req.user = user;
    next();
  } catch (err) {
    console.log("Error verifying token: ", err);
    console.log("Error verifying token: ", token);
    res.clearCookie("JWT_Token");
    return res.status(403).json({ message: "Error verifying token" });
  }
}

module.exports = authenticateToken;
