const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
require("./product-in-cart");
const orderSchema = new mongoose.Schema(
  {
    products: [mongoose.model("ProductInCart").schema],

    transactionId: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
      default: 0,
    },

    address: {
      type: Object,
    },

    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
