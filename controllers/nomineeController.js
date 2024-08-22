const Nominee = require("../models/Nominee");
const User = require("../models/User");

// @desc    Add a nominee
// @route   POST /api/nominees
const addNominee = async (req, res) => {
  const { userId, name, relation, contactNumber, address, aadharNumber } =
    req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const nominee = await Nominee.create({
    userId,
    name,
    relation,
    contactNumber,
    address,
    aadharNumber,
  });

  if (nominee) {
    // Optionally, add nominee reference to user
    // user.nominees.push(nominee._id);
    // await user.save();

    res.status(201).json(nominee);
  } else {
    res.status(400).json({ message: "Invalid nominee data" });
  }
};

// @desc    Get all nominees for a user
// @route   GET /api/nominees/:userId
const getNominees = async (req, res) => {
  const nominees = await Nominee.find({ userId: req.params.userId });

  if (nominees.length > 0) {
    res.json(nominees);
  } else {
    res.status(404).json({ message: "No nominees found" });
  }
};

module.exports = {
  addNominee,
  getNominees,
};
