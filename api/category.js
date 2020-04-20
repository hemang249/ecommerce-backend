const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getCategoryById,
  getSingleCategory,
  getAllCategories,
} = require("../controllers/category");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post("/:userId", isLoggedIn, isAuthenticated, isAdmin, createCategory);

router.get("/single/:categoryId", getSingleCategory);
router.get("/all", getAllCategories);

router.put(
  "/:userId/:categoryId",
  isLoggedIn,
  isAuthenticated,
  isLoggedIn,
  updateCategory
);

module.exports = router;
