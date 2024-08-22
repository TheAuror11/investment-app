const Transaction = require("../models/Transaction");

const handleGetAllTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const handleGetWithDrawalTransaction = async (req, res) => {
  try {
    const debitTransactions = await Transaction.find({ type: "Debit" });
    res.status(200).json(debitTransactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  handleGetAllTransaction,
  handleGetWithDrawalTransaction,
};
