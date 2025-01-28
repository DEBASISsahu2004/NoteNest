const express = require("express");
const {
  sendOtp,
  signUp,
  checkotp,
  resendotp,
  googleAuth,
  verifyEmail,
  resetPassword,
  login,
  getUserProfile,
} = require("../controllers/userController");
require("dotenv").config();
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

//signup
router.post("/sendotp", sendOtp);
router.post("/signup", signUp);

//login
router.post("/verifyemail", verifyEmail);
router.post("/resetpassword", resetPassword);
router.post("/login", login);

// common routes for login and signup
router.post("/verifyotp", checkotp);
router.post("/resendotp", resendotp);
router.post("/googleAuth", googleAuth);

// require auth
router.get("/profile", authenticateToken, getUserProfile);

module.exports = router;
