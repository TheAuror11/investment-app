const Transaction = require("../models/Transaction");
const User = require("../models/User");

// @route   POST /api/users/add-balance
// @desc    Add balance to a user's account
// @access  Private
// router.post('/users/add-balance',
const handleAddBalance = async (req, res) => {
  const { accountNumber, amount } = req.body;

  try {
    // Find the user by account number
    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if KYC is completed
    if (!user.isKYCCompleted) {
      return res.status(400).json({ msg: "Complete KYC first" });
    }

    // Add the amount to the user's balance
    user.balance += amount;
    await user.save();

    // Create a new transaction record
    const transaction = new Transaction({
      userId: user._id,
      type: "Credit", // This is a credit transaction
      amount,
    });

    // Save the transaction record
    await transaction.save();

    // Update the user's transactions array
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
