const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getProductById,
  createProduct,
  getThumbnail,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/product");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post("/:userId", isLoggedIn, isAuthenticated, isAdmin, createProduct);

router.get("/:productId", getSingleProduct);
router.get("/thumbnail/:productId", getThumbnail);
router.get("/all", getAllProducts);

router.put(
  "/:productId/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

router.delete(
  "/:productId/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

module.exports = router;
