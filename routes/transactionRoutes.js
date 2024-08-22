const express = require("express");
const { handleTransaction } = require("../controllers/transactionController");
const router = express.Router();

router.post("/", handleTransaction);

module.exports = router;
