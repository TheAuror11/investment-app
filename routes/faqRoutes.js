const express = require("express");
const { getFAQs } = require("../controllers/faqController");
const router = express.Router();
const jwtAuthMiddleware = require("../middlewares/authMiddleware");

router.get("/", jwtAuthMiddleware, getFAQs);

module.exports = router;
