const User = require("../models/User");

// @desc    Submit KYC information
// @route   POST /api/kyc/submit
const submitKYCInfo = async (req, res) => {
  const { mobileNumber, aadharNumber, panCardNumber, address, gender } =
    req.body;

  const userId = req.user.id;
  // Validate required fields
  if (!mobileNumber || !aadharNumber || !panCardNumber || !address || !gender) {
    return res.status(400).json({
      message:
        "Mobile number, Aadhaar number, and PAN card number, Address, Gender are required",
    });
  }

  try {
    // Find the user by mobile number
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isKYCCompleted)
      return res.status(404).json({ message: "KYC Already Completed" });

    // Update user with KYC information
    user.aadharNumber = aadharNumber;
    user.panCardNumber = panCardNumber;
    user.address = address;
    user.gender = gender;
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
