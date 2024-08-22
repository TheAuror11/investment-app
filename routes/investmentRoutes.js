const express = require("express");
const {
  makeInvestment,
  getInvestments,
} = require("../controllers/investmentController");
const router = express.Router();

router.post("/", makeInvestment);
router.get("/:userId", getInvestments);

module.exports = router;
