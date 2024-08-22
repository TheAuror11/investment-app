const jwt = require("jsonwebtoken");

const logoutUser = async (req, res) => {
  req.headers["authorization"] = undefined;
  console.log(req.headers["authorization"]);

  return res.clearCookie("token").json({ message: "User Logged Out" });
};

module.exports = {
  logoutUser,
};
