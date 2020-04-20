const express = require("express");
const router = express.Router();
const { getUserById, getUser } = require("../controllers/user");
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);
router.get("/:userId", isLoggedIn, isAuthenticated, getUser);

module.exports = router;
