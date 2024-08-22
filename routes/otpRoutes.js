const express = require("express");
const { sendOtpToMobile, verifyOtp } = require("../controllers/otpController");
const router = express.Router();

router.post("/send-otp", sendOtpToMobile);
router.post("/verify-otp", verifyOtp);

module.exports = router;
