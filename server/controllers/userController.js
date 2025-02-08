const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Note = require("../models/note");
const { sendOtpEmail, sendEmail } = require("../config/email");
const { generateOtp, storeOtp, verifyOtp, deleteOtp } = require("../utils/otp");
const { generateAccessToken } = require("../utils/token");
const { generateRandomPassword } = require("../utils/password");

// signup
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists 🙄" });
    }

    const otp = generateOtp();
    storeOtp(email, otp);

    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "OTP sent to email 👍" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error sending OTP 😵" });
  }
};

const signUp = async (req, res) => {
  try {
    const { email, username, password, profilepic } = req.body;

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      profilepic,
    });
    await newUser.save();

    await generateAccessToken(newUser, res);

    return res.status(200).json({ message: "Account Created 👍" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while creating account 😵‍💫" });
  }
};

// login
const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      const otp = generateOtp();
      storeOtp(email, otp);

      await sendOtpEmail(email, otp);
      return res.status(200).json({ message: "OTP sent to email 👍" });
    } else {
      return res.status(400).json({ message: "User not found 🧐" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error sending OTP 😵" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );

    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    if (user) {
      return res
        .status(200)
        .json({ message: "Password changed successfully 👍" });
    } else {
      return res.status(400).json({ message: "User not found 🧐" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error resetting password" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found, Please Sign Up 🙄" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password 🧐" });
    }

    await generateAccessToken(user, res);

    return res.status(200).json({ message: "Successfully logged in 😁" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while logging in 😵‍💫" });
  }
};

const checkotp = async (req, res) => {
  const { email, otp } = req.body;

  if (verifyOtp(email, otp)) {
    deleteOtp(email);
    return res.status(200).json({ message: "OTP verified successfully 😁" });
  } else {
    return res.status(400).json({ message: "Invalid OTP 🧐" });
  }
};

const resendotp = async (req, res) => {
  const { email } = req.body;

  try {
    const otp = generateOtp();
    storeOtp(email, otp);
    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "OTP sent to email 👍" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error sending OTP 😵" });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { email, name, profilepic } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      const password = generateRandomPassword();
      const html = `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Welcome to NoteNest</h2>
          <p>Your account has been created successfully. Please use the following password to log in:</p>
          <h1 style="color:rgb(0, 128, 255);">${password}</h1>
          <p>We recommend changing your password after logging in for the first time.</p>
        </div>
      `;
      await sendEmail(email, "Your Password", html);
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT)
      );

      user = new User({
        email,
        username: name,
        password: hashedPassword,
        profilepic,
      });

      await user.save();
      user = await User.findOne({ email });
    }

    await generateAccessToken(user, res);

    return res.status(200).json({ message: "Sucessfully logged in 😁" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to login with Google 😵‍💫" });
  }
};

// Fetching user data
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const notes = await Note.find({ user: req.user.id });

    return res.status(200).json({ user, notes });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetching user profile 😵‍💫" });
  }
};

const changeUserProfilePic = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilepic },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json({ message: "Profile pic updated successfully 😁", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update profile pic 😵‍💫" });
  }
};

const changeUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json({ message: "Username updated successfully 😁", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update username 😵‍💫" });
  }
};

module.exports = {
  sendOtp,
  signUp,
  resendotp,
  googleAuth,
  checkotp,
  verifyEmail,
  resetPassword,
  login,
  getUserProfile,
  changeUserProfilePic,
  changeUsername,
};
