const otpList = {};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const storeOtp = (email, otp) => {
  otpList[email] = otp;
};

const verifyOtp = (email, otp) => {
  return otpList[email] && otpList[email] === otp;
};

const deleteOtp = (email) => {
  delete otpList[email];
};

module.exports = { generateOtp, storeOtp, verifyOtp, deleteOtp };
