const Withdrawal = require("../models/Withdrawal");
const User = require("../models/User");

// @desc    Request a withdrawal
// @route   POST /api/withdrawals
const requestWithdrawal = async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ message: "User ID and amount are required" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (amount > user.availableMoney) {
    return res.status(400).json({ message: "Insufficient funds" });
  }

  // Create a new withdrawal request
  const withdrawal = await Withdrawal.create({
    userId,
    amount,
  });

  // Optionally, deduct the money from user's available balance here if required
  user.availableMoney -= amount;
  await user.save();

  res.status(201).json(withdrawal);
};

// @desc    Get all withdrawal requests for a user
// @route   GET /api/withdrawals/:userId
const getWithdrawals = async (req, res) => {
  const withdrawals = await Withdrawal.find({ userId: req.params.userId });

  if (withdrawals.length > 0) {
    res.json(withdrawals);
  } else {
    res.status(404).json({ message: "No withdrawal requests found" });
  }
};

module.exports = {
  requestWithdrawal,
  getWithdrawals,
};
