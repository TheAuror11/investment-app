const express = require("express");
const { addNominee, getNominees } = require("../controllers/nomineeController");
const jwtAuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", jwtAuthMiddleware, addNominee);

module.exports = router;
