const express = require("express");
const router = express.Router();
const { makePayment } = require("../controllers/stripe");

router.post("/", makePayment);

module.exports = router;
