const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Connect Database
connectDB();

// API Routes
/*01*/ app.use("/api/users", require("./routes/userRoutes")); // User login
/*02*/ app.use("/api/kyc", require("./routes/kycRoutes")); // Add eKYC
/*03*/ app.use("/api/investments", require("./routes/investmentRoutes")); // Check Investments
/*04*/ app.use("/api/nominees", require("./routes/nomineeRoutes")); // Add Nominee
/*05*/ app.use("/api/auth", require("./routes/authRoutes")); // For logout
/*06*/ app.use("/api/auth", require("./routes/otpRoutes")); // For OTP
/*07*/ app.use("/api/withdrawals", require("./routes/withdrawalRoutes")); // For withdrawals
/*08*/ app.use("/api/addbankaccounts", require("./routes/bankAccountRoutes")); // For add bank accounts
/*09*/ app.use("/api/transactions", require("./routes/transactionRoutes")); // For transactions
/*10*/ app.use("/api/faqs", require("./routes/faqRoutes")); // For FAQs
/*11*/ app.use("/api/contact", require("./routes/contactRoutes")); // For contact messages

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
