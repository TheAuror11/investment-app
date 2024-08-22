const path = require("path");
const fs = require("fs");

// Define the path to the FAQs JSON file
const faqsFilePath = path.join(__dirname, "../data/faqs.json");

// @desc    Get all FAQs
// @route   GET /api/faqs
const getFAQs = (req, res) => {
  fs.readFile(faqsFilePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error reading FAQ file", error: err });
    }

    try {
      const faqs = JSON.parse(data);
      res.status(200).json(faqs);
    } catch (parseError) {
      res
        .status(500)
        .json({ message: "Error parsing FAQ data", error: parseError });
    }
  });
};

module.exports = {
  getFAQs,
};
