const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  createCategory,
  updateCategory,
  getCategoryById,
  getSingleCategory,
  getAllCategories,
  deleteSingleCategory,
} = require("../controllers/category");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post("/:userId", isLoggedIn, isAuthenticated, isAdmin, createCategory);

router.get("/single/:categoryId", getSingleCategory);
router.get("/all", getAllCategories);

router.put(
  "/:categoryId/:userId",
  isLoggedIn,
  isAuthenticated,
  isLoggedIn,
  updateCategory
);

router.delete(
  "/:categoryId/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  deleteSingleCategory
);

module.exports = router;
