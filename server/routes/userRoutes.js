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
} = require("../controllers/userController");
require("dotenv").config();
const router = express.Router();

//signup
router.post("/sendotp", sendOtp);
router.post("/signup", signUp);

//login
router.post("/verifyemail", verifyEmail);
router.post("/resetpassword", resetPassword);
router.post("/login", login);

router.post("/verifyotp", checkotp);
router.post("/resendotp", resendotp);
router.post("/googleAuth", googleAuth);

module.exports = router;
