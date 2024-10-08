const express = require("express");
const { addBankAccount } = require("../controllers/bankAccountController");
const router = express.Router();
const jwtAuthMiddleware = require("../middlewares/authMiddleware");

router.post("/", jwtAuthMiddleware, addBankAccount);

module.exports = router;
