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
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = generateOtp();
    storeOtp(email, otp);

    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    return res.status(500).json({ message: "Error sending OTP", error });
  }
};

const signUp = async (req, res) => {
  try {
    const { email, username, password, profilepic } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      profilepic,
    });
    await newUser.save();

    const accessToken = generateAccessToken(newUser);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(200).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error in creating user", error });
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
      return res.status(200).json({ message: "OTP sent to email" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error verifying email", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );
    if (user) {
      return res.status(200).json({ message: "Password reset successfully" });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error resetting password", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      username: user.username,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
};

const checkotp = async (req, res) => {
  const { email, otp } = req.body;

  if (verifyOtp(email, otp)) {
    deleteOtp(email);
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};

const resendotp = async (req, res) => {
  const { email } = req.body;

  const otp = generateOtp();
  storeOtp(email, otp);
  await sendOtpEmail(email, otp);

  return res.status(200).json({ message: "OTP sent to email" });
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
          <h1 style="color:rgb(0, 166, 255);">${password}</h1>
          <p>We recommend changing your password after logging in for the first time.</p>
        </div>
      `;
      await sendEmail(email, "Your Password", html);
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        email,
        username: name,
        password: hashedPassword,
        profilepic,
      });
      await user.save();
    }

    const accessToken = generateAccessToken(user);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "User authenticated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in Google authentication", error });
  }
};

// user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const notes = await Note.find({ user: req.user.id });

    return res.status(200).json({
      username: user.username,
      email: user.email,
      profilepic: user.profilepic,
      notes: notes,
      totalNotes: notes.length,
      favoriteNotes: notes.filter((note) => note.isFavorite).length,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res
      .status(500)
      .json({ message: "Error fetching user profile", error });
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
};
