const express = require("express");
const jwtAuthMiddleware = require("../middlewares/authMiddleware");
const handleAddBalance = require("../controllers/addBalanceController");
const router = express.Router();

// @route   POST /api/users/add-balance

router.post("/", jwtAuthMiddleware, handleAddBalance);

module.exports = router;