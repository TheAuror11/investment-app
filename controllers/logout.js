const jwt = require("jsonwebtoken");

// @desc    Logout user
// @route   POST /api/auth/logout
const logoutUser = async (req, res) => {
  req.headers["authorization"] = undefined;
  console.log(req.headers["authorization"]);

  return res.clearCookie("token").json({ message: "User Logged Out" });
};

module.exports = {
  logoutUser,
};
