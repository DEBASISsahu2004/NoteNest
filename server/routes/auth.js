const express = require("express");
const router = express.Router();
const { verifyRefreshToken, generateAccessToken } = require("../utils/token");

router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token not provided" }); // Forbidden
  }

  try {
    const user = verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" }); // Forbidden
  }
});

module.exports = router;
