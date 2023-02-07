const express = require("express");
const getTolls = require("../controllers/tollsController");

const router = express.Router();

// get tolls
router.post("/getTolls", getTolls);
// add route to favorite

// remove route from favorites

module.exports = router;
