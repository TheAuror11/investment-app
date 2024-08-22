const express = require("express");
const { submitKYCInfo } = require("../controllers/kycController");
const router = express.Router();
const jwtAuthMiddleware = require("../middlewares/authMiddleware");

// Route for submitting KYC information
router.post("/submit", jwtAuthMiddleware, submitKYCInfo);

module.exports = router;
