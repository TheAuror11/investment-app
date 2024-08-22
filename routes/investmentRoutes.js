const express = require("express");
const jwtAuthMiddleware = require("../middlewares/authMiddleware");
const handlePostInvestment = require("../controllers/investmentController");
const router = express.Router();

router.post("/", jwtAuthMiddleware, handlePostInvestment);

module.exports = router;
