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
  changeUserProfilePic,
  changeUsername,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

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
router.get("/getuserdata", authenticateToken, getUserProfile);
router.post("/changeprofilepic", authenticateToken, changeUserProfilePic);
router.post("/changeusername", authenticateToken, changeUsername);

module.exports = router;
