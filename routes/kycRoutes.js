const express = require("express");
const { submitKYCInfo } = require("../controllers/kycController");
const router = express.Router();
const jwtAuthMiddleware = require("../middlewares/authMiddleware");

router.post("/submit", jwtAuthMiddleware, submitKYCInfo);

module.exports = router;
