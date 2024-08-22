const express = require("express");
const { logoutUser } = require("../controllers/authController");
const router = express.Router();

router.post("/logout", logoutUser);

module.exports = router;
