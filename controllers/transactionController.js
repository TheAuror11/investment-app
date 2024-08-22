const User = require("../models/User");

// @desc    Handle money transactions (both deposits and withdrawals)
// @route   POST /api/transactions
const handleTransaction = async (req, res) => {
  const { userId, amount, description, type } = req.body;

  if (!userId || !amount || !type) {
    return res
      .status(400)
      .json({ message: "User ID, amount, and type are required" });
  }

  if (amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be greater than zero" });
  }

  if (!["credit", "debit"].includes(type)) {
    return res.status(400).json({ message: "Invalid transaction type" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (type === "debit" && amount > user.balance) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    if (type === "credit") {
      user.balance += amount;
    } else if (type === "debit") {
      user.balance -= amount;
    }

    user.transactions.push({
      amount,
      type,
      description,
    });

    await user.save();

    res.status(200).json({
      message: `Money ${
        type === "credit" ? "added" : "withdrawn"
      } successfully`,
      balance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  handleTransaction,
};
