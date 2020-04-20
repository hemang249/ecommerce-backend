const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const categoryRouter = require("./category");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);

module.exports = router;
