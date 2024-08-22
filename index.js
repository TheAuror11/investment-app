const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Connect Database
connectDB();

// API Routes
/*01*/ app.use("/api/users", require("./routes/userRoutes")); // User login - 2 APIs
/*02*/ app.use("/api/kyc", require("./routes/kycRoutes")); // Add eKYC - 1 API
/*03*/ app.use("/api/transactions", require("./routes/transactionRoutes")); // For transactions - 2 APIs
/*04*/ app.use("/api/nominees", require("./routes/nomineeRoutes")); // Add Nominee - 1 API
/*05*/ app.use("/api/auth", require("./routes/logout")); // For logout - 1 API
/*06*/ app.use("/api/addbankaccounts", require("./routes/bankAccountRoutes")); // For add bank accounts - 1 API
/*07*/ app.use("/api/faqs", require("./routes/faqRoutes")); // For FAQs - 1 API
/*08*/ app.use("/api/contact", require("./routes/contactRoutes")); // For contact messages - 1 API
/*09*/ app.use("/api/investments", require("./routes/investmentRoutes")); // For Investments - 1 API
/*10*/ app.use("/users/add-balance", require("./routes/addBalanceRoute")); // For Add Balance to Account - 1 API

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
