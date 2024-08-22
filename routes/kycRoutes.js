const express = require("express");
const { submitKYCInfo } = require("../controllers/kycController");
const router = express.Router();

// Route for submitting KYC information
router.post("/submit", submitKYCInfo);

module.exports = router;
