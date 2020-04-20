const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  signoutController,
} = require("../controllers/auth");

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    description: register new user
 *    responses:
 *      '200': OK
 *
 *
 */
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/signout", signoutController);

module.exports = router;
