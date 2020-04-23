const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const categoryRouter = require("./category");
const productRouter = require("./product");
const orderRouter = require("./order");
const stripeRouter = require("./stripe");
const apiDocsRouter = require("./api-docs");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/stripe", stripeRouter);
router.use("/api-docs", apiDocsRouter);

module.exports = router;
