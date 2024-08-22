const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOTP = (to, otp) => {
  return client.messages.create({
    body: `Your OTP code is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });
};

module.exports = { sendOTP };
