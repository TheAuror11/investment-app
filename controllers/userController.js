const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/users/signup
const registerUser = async (req, res) => {
  const { mobileNumber, password } = req.body;

  const userExists = await User.findOne({ mobileNumber });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    mobileNumber,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      mobileNumber: user.mobileNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/signin
const authUser = async (req, res) => {
  const { mobileNumber, password } = req.body;

  const user = await User.findOne({ mobileNumber });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      mobileNumber: user.mobileNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = {
  registerUser,
  authUser,
};
