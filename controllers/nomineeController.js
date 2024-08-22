const Nominee = require("../models/Nominee");
const User = require("../models/User");

const addNominee = async (req, res) => {
  const { name, relation, contactNumber, address, aadharNumber } = req.body;
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user.isKYCCompleted == false) {
    return res.status(404).json({ message: "KYC Not Done" });
  }

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
    res.status(201).json(nominee);
  } else {
    res.status(400).json({ message: "Invalid nominee data" });
  }
};

module.exports = {
  addNominee,
};
