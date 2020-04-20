const User = require("../models/user");
const Order = require("../models/order");

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
    req.profile.salt = undefined;
    req.profile.encryptedPassword = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false }
      );
      updatedUser.salt = undefined;
      updatedUser.encryptedPassword = undefined;
      res.status(200).json({ user: updatedUser });
    } catch (err) {
      res.status(500).json({ error: "Something went wrong on the server !" });
    }
  },

  getUserOrders: async (req, res) => {
    Order.find({ user: req.profile._id })
      .populate("user", "_id firstName lastName email")
      .exec((err, orders) => {
        if (err) {
          res.status(404).json({ error: "No Orders Exist!" });
        } else {
          res.status(200).json(orders);
        }
      });
  },

  addUserOrder: async (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach((product) => {
      purchases.push({
        _id: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        amount: req.body.order.amount,
        transaction_id: req.body.order.transaction_id,
      });
    });

    try {
      const purchaseList = await User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases } },
        { new: true }
      );
      next();
    } catch (err) {
      res.status(400).json({ error: "Failed to add the order" });
    }
  },
};
