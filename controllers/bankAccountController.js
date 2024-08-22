const BankAccount = require("../models/BankAccount");
const User = require("../models/User");

// @desc    Add a bank account for a user
// @route   POST /api/bankaccounts
const addBankAccount = async (req, res) => {
  const { userId, bankName, accountNumber, ifscCode, accountType } = req.body;

  if (!userId || !bankName || !accountNumber || !ifscCode || !accountType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Ensure the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the bank account already exists
    const existingAccount = await BankAccount.findOne({ userId });

    if (existingAccount) {
      return res
        .status(400)
        .json({ message: "Bank account already exists for this user" });
    }

    // Create a new bank account
    const bankAccount = new BankAccount({
      userId,
      bankName,
      accountNumber,
      ifscCode,
      accountType,
    });

    await bankAccount.save();

    res.status(201).json(bankAccount);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addBankAccount,
};
