const mongoose = require("mongoose");

const NomineeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  address: String,
  aadharNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Nominee", NomineeSchema);
