const express = require("express");
const config = require("./common/config");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(config.MONGOURI, { useNewUrlParser: true });

app.listen(config.PORT, () => {
  console.log("Server Up and Running on Port " + config.PORT);
});
