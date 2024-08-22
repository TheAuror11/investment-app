const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

const protect = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Check if token is blacklisted
  redisClient.get(`blacklist:${token}`, (err, reply) => {
    if (err || reply) {
      return res.status(401).json({ message: "Token has been invalidated" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.user = decoded;
      next();
    });
  });
};

module.exports = { protect };
