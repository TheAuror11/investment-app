const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 });
};

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      mobileNumber,
      password,
      accountNumber,
      aadharNumber,
      panCardNumber,
      dateOfBirth,
      gender,
      address,
    } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = await User.findOne({ mobileNumber });
    if (user) {
      return res.status(400).json({ msg: "Mobile number already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      mobileNumber,
      passwordHash,
      accountNumber,
      aadharNumber,
      panCardNumber,
      dateOfBirth,
      gender,
      address,
    });

    await user.save();

    const payload = {
      id: user.id,
    };

    const token = generateToken(payload);
    console.log("Token is: ", token);

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const authUser = async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    let user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  registerUser,
  authUser,
};
