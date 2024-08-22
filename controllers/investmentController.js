const Investment = require("../models/Investment");

// @desc    Make an investment
// @route   POST /api/investments
const makeInvestment = async (req, res) => {
  const { userId, investmentType, amount } = req.body;

  const investment = await Investment.create({
    userId,
    investmentType,
    amount,
  });

  if (investment) {
    res.status(201).json({ message: "Investment made successfully" });
  } else {
    res.status(400).json({ message: "Invalid investment data" });
  }
};

// @desc    Get all investments for a user
// @route   GET /api/investments/:userId
const getInvestments = async (req, res) => {
  const investments = await Investment.find({ userId: req.params.userId });

  if (investments) {
    res.json(investments);
  } else {
    res.status(404).json({ message: "No investments found" });
  }
};

module.exports = {
  makeInvestment,
  getInvestments,
};
