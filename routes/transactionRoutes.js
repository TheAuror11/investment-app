const express = require("express");
const {
  handleGetAllTransaction,
  handleGetWithDrawalTransaction,
} = require("../controllers/transactionController");
const jwtAuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", jwtAuthMiddleware, handleGetAllTransaction);
router.get("/withdrawal", jwtAuthMiddleware, handleGetWithDrawalTransaction);

module.exports = router;
