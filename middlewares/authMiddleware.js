const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // Extract the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = jwtAuthMiddleware;
