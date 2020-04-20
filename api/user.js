const express = require("express");
const router = express.Router();
const {
  getUserById,
  getUser,
  updateUser,
  getUserOrders,
} = require("../controllers/user");
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);
router.get("/:userId", isLoggedIn, isAuthenticated, getUser);
router.put("/:userId", isLoggedIn, isAuthenticated, updateUser);
router.get("/orders/:userId", isLoggedIn, isAuthenticated, getUserOrders);

module.exports = router;
