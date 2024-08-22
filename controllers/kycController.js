const User = require("../models/User");

// @desc    Submit KYC information
// @route   POST /api/kyc/submit
const submitKYCInfo = async (req, res) => {
  const { mobileNumber, aadharNumber, panCardNumber } = req.body;

  // Validate required fields
  if (!mobileNumber || !aadharNumber || !panCardNumber) {
    return res
      .status(400)
      .json({
        message:
          "Mobile number, Aadhaar number, and PAN card number are required",
      });
  }

  try {
    // Find the user by mobile number
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user with KYC information
    user.aadharNumber = aadharNumber;
    user.panCardNumber = panCardNumber;
    user.isKYCCompleted = true;

    await user.save();

    res.status(200).json({ message: "KYC information submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  submitKYCInfo,
};
