const express = require("express");
const { submitContactMessage } = require("../controllers/contactController");
const router = express.Router();
const jwtAuthMiddleware = require("../middlewares/authMiddleware");

router.post("/", jwtAuthMiddleware, submitContactMessage);

module.exports = router;
