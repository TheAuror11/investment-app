const redisClient = require("../config/redis");
const jwt = require("jsonwebtoken");

// @desc    Logout user & blacklist token
// @route   POST /api/auth/logout
const logoutUser = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  // Add token to blacklist
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    redisClient.set(`blacklist:${token}`, "true", "EX", 3600, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error blacklisting token" });
      }

      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};

module.exports = {
  logoutUser,
};
