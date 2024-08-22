const User = require("../models/User");
const Investment = require("../models/Investment");
const Transaction = require("../models/Transaction");

const handlePostInvestment = async (req, res) => {
  const userId = req.user.id;
  const { amount, tenure, interestRate } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    const investment = new Investment({
      userId,
      amount,
      tenure,
      interestRate: interestRate || 7.5, // Default to 7.5% if not provided
    });

    const savedInvestment = await investment.save();

    user.balance -= amount;
    await user.save();

    const transaction = new Transaction({
      userId,
      type: "Debit",
      amount,
    });

    await transaction.save();

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
