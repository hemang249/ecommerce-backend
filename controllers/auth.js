const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../common/config");
const expressJwt = require("express-jwt");

module.exports = {
  registerController: async (req, res, next) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
        purchases: user.purchases,
        role: user.role,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Unable to Create the User" });
    }
    next();
  },

  loginController: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user.comparePassword(password)) {
        const { _id, firstName, lastName, email, purchases, role } = user;
        const token = jwt.sign({ _id: user._id }, config.secret);

        res
          .cookie("token", token, { expire: new Date() + 999 })
          .status(200)
          .json({
            user: { _id, firstName, lastName, email, purchases, role },
            token,
          });
      } else {
        res.status(401).json({ error: "Incorrect Password !" });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: "No Such User Exists !" });
    }
    next();
  },

  signoutController: async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({});
    next();
  },

  isLoggedIn: expressJwt({
    secret: config.secret,
    userProperty: "auth",
  }),

  isAuthenticated: async (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!checker) {
      res.status(401).json({ error: "Unauthorised" });
    }

    next();
  },

  isAdmin: async (req, res, next) => {
    if (req.profile.role !== 1) {
      res.status(401).json("Unauthorised");
    }

    next();
  },
};
