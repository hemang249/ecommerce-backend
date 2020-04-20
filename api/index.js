const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const categoryRouter = require("./category");
const productRouter = require("./product");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

module.exports = router;
