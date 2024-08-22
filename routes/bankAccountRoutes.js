const express = require("express");
const { addBankAccount } = require("../controllers/bankAccountController");
const router = express.Router();

router.post("/", addBankAccount);

module.exports = router;
