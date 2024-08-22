const Contact = require("../models/Contact");

// @desc    Submit a contact message
// @route   POST /api/contact
const submitContactMessage = async (req, res) => {
  const userId = req.user.id;

  if (!userId) res.status(500).json({ message: "User Not Logged In" });

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const contactMessage = new Contact({
      name,
      email,
      message,
    });

    await contactMessage.save();

    res.status(201).json({ message: "Contact message submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  submitContactMessage,
};
