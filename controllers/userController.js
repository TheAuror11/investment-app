const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/users/signup
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

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/signin
const authUser = async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    // Check if the user exists by mobile number
    let user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Generate JWT Token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, "your_jwt_secret", {
      expiresIn: "1h", // Token expires in 1 hour
    });

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
