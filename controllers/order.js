const Order = require("../models/order");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const uuid = require("uuid/v4");

module.exports = {
  getOrderById: async (req, res, next, id) => {
    try {
      const order = Order.findOne({ _id: id }).populate(
        "products.product",
        "name price"
      );
      req.order = order;
      next();
    } catch (err) {
      res.status(400).json({ error: "No order exists by this id" });
    }
  },

  createOrder: async (req, res) => {
    try {
      req.body.order.user = req.profile._id;
      req.body.order.transactionId = uuid();
      const order = new Order(req.body.order);
      const newOrder = await order.save();
      res.status(200).json(newOrder);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Error making the order" });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      console.log(req.profile);
      const orders = await Order.find({ user: req.profile._id });
      console.log(orders);
      res.status(200).json({ orders });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "No Orders Exist" });
    }
  },
};
