const BankAccount = require("../models/BankAccount");
const User = require("../models/User");

const addBankAccount = async (req, res) => {
  const userId = req.user.id;

  const { bankName, accountNumber, ifscCode, accountType } = req.body;

  if (!bankName || !accountNumber || !ifscCode || !accountType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isKYCCompleted == false) {
      return res
        .status(404)
        .json({ message: "Complete Your KYC Before Adding An Account" });
    }

    const existingAccount = await BankAccount.findOne({ accountNumber });

    if (existingAccount) {
      return res
        .status(400)
        .json({ message: "Bank account already exists for this user" });
    }

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
