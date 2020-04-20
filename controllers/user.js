const User = require("../models/user");

module.exports = {
  getUserById: (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        res.status(404).json({ error: "No such user was found!" });
      } else {
        req.profile = user;
        next();
      }
    });
  },

  getUser: async (req, res) => {
    return res.json(req.profile);
  },
};
