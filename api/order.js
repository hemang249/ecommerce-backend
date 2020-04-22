const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById, addUserOrder } = require("../controllers/user");
const { getOrderById, createOrder } = require("../controllers/order");
const { updateStock } = require("../controllers/product");

router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post(
  "/:userId",
  isLoggedIn,
  isAuthenticated,
  addUserOrder,
  updateStock,
  createOrder
);

module.exports = router;
