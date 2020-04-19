const express = require("express");
const config = require("./common/config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./api/index");
const app = express();

mongoose
  .connect(config.MONGOURI, { useNewUrlParser: true })
  .then(() => console.log("Database Loaded"))
  .catch((err) => {
    console.log("Some Database Error Occurred : " + err);
    process.exit();
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1", router);

app.listen(config.PORT, () => {
  console.log("Server Up and Running on Port " + config.PORT);
});
