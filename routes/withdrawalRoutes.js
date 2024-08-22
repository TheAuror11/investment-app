const express = require("express");
const {
  requestWithdrawal,
  getWithdrawals,
} = require("../controllers/withdrawalController");
const router = express.Router();

router.post("/", requestWithdrawal);
router.get("/:userId", getWithdrawals);

module.exports = router;
