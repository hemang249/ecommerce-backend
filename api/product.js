const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { getProductById, createProduct } = require("../controllers/product");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post("/:userId", createProduct);

module.exports = router;
