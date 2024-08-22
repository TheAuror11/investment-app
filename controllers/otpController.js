const User = require("../models/User"); // Assuming you have a User model
const { generateOTP } = require("../utils/otp");
const { sendOTP } = require("../config/twilio");

// @desc    Send OTP to mobile number
// @route   POST /api/auth/send-otp
const sendOtpToMobile = async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  const otp = generateOTP();

  // Save OTP to user's record (you might want to use a separate OTP model or a temporary storage)
  let user = await User.findOne({ mobileNumber });

  if (!user) {
    user = new User({ mobileNumber, otp });
  } else {
    user.otp = otp;
  }

  await user.save();

  try {
    await sendOTP(mobileNumber, otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
const verifyOtp = async (req, res) => {
  const { mobileNumber, otp } = req.body;

  if (!mobileNumber || !otp) {
    return res
      .status(400)
      .json({ message: "Mobile number and OTP are required" });
  }

  const user = await User.findOne({ mobileNumber });

  if (!user || user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // OTP is correct, proceed with login (e.g., generate a JWT token)
  // Clear OTP from the user record
  user.otp = null;
  await user.save();

  res.status(200).json({ message: "OTP verified successfully" });
};

module.exports = {
  sendOtpToMobile,
  verifyOtp,
};
