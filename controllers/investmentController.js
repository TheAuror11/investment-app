const User = require("../models/User");
const Investment = require("../models/Investment");
const Transaction = require("../models/Transaction");

// @route   POST /api/investments
// @desc    Create a new investment
// @access  Private
const handlePostInvestment = async (req, res) => {
  const userId = req.user.id;
  const { amount, tenure, interestRate } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    // Create a new investment
    const investment = new Investment({
      userId,
      amount,
      tenure,
      interestRate: interestRate || 7.5, // Default to 7.5% if not provided
    });

    // Save the investment
    const savedInvestment = await investment.save();

    // Deduct the investment amount from the user's balance
    user.balance -= amount;
    await user.save();

    // Create a new transaction record
    const transaction = new Transaction({
      userId,
      type: "Debit", // This is a debit transaction
      amount,
    });

    // Save the transaction record
    await transaction.save();

    // Update the user's transactions array
    user.transactions.push(transaction._id);
    await user.save();

    res.status(201).json({
      msg: "Investment created successfully",
      investment: savedInvestment,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = handlePostInvestment;
