const Order = require("../models/order");
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
      req.body.order.user = req.profile;
      req.body.order.transactionId = uuid();
      const order = new Order(req.body.order);
      const newOrder = await order.save();
      res.status(200).json(newOrder);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Error making the order" });
    }
  },
};
