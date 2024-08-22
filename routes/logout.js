const express = require("express");
const { logoutUser } = require("../controllers/logout");
const router = express.Router();
const jwtAuthMiddleware = require("../middlewares/authMiddleware");

router.post("/logout", jwtAuthMiddleware, logoutUser);

module.exports = router;
