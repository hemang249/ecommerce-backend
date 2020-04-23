const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  fs.readFile(__dirname + "/../swagger.json", (err, json) => {
    let obj = JSON.parse(json);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(obj);
  });
});

module.exports = router;
