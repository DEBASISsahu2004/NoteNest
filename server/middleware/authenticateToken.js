const jwt = require("jsonwebtoken");
const { verifyAccessToken } = require("../utils/token");

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  // If token not present, deny access
  if (!token) {
    return res.status(403).json({ message: "Token not found, login" }); // Forbidden
  }

  // Verify token
  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(403).json({ message: "Error verifying token" }); // Forbidden
  }
}

module.exports = authenticateToken;
