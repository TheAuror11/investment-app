const express = require("express");
const { addNominee, getNominees } = require("../controllers/nomineeController");
const router = express.Router();

router.post("/", addNominee);
router.get("/:userId", getNominees);

module.exports = router;
