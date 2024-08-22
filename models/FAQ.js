const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  answer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

FAQSchema.pre("save", function (next) {
  if (this.isModified("answer")) {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model("FAQ", FAQSchema);
