const BankAccount = require("../models/BankAccount");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

const handleAddBalance = async (req, res) => {
  const userId = req.user.id;
  const { accountNumber, amount } = req.body;

  try {
    const user = await User.findById(userId);
    const account = await BankAccount.findOne({ userId });

    // if (accountNumber != account.accountNumber) {
    //   return res.status(400).json({ msg: "Enter Your Correct Account Number" });
    // }
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.accountNumber != accountNumber) {
      return res.status(400).json({ msg: "Enter Your Correct Account Number" });
    }
    if (!user.isKYCCompleted) {
      return res.status(400).json({ msg: "Complete KYC first" });
    }

    user.balance += amount;
    await user.save();

    const transaction = new Transaction({
      userId: user._id,
      type: "Credit",
      amount,
    });

    await transaction.save();

    user.transactions.push(transaction._id);
    await user.save();

    res
      .status(200)
      .json({ msg: "Balance added successfully", balance: user.balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = handleAddBalance;
