const crypto = require("crypto");

// Generate a 4-digit OTP
const generateOTP = () => {
  return crypto.randomInt(1000, 9999).toString();
};

module.exports = { generateOTP };
