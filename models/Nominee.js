const mongoose = require("mongoose");

const InvestmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  tenure: {
    type: Number, // tenure in months or years
    required: true,
  },
  interestRate: {
    type: Number,
    default: 7.5, // Default interest rate
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Investment = mongoose.model("Investment", InvestmentSchema);
module.exports = Investment;
