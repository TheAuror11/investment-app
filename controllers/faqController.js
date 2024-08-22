const path = require("path");
const fs = require("fs");

const faqsFilePath = path.join(__dirname, "../data/faqs.json");

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
