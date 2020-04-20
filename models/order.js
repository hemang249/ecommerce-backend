const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [mongoose.model("ProductInCart").schema],

    transactionId: {},

    amount: {
      type: Number,
      required: true,
      default: 0,
    },

    address: {
      type: String,
      required: true,
    },

    postalCode: {
      type: Number,
      required: true,
    },

    updated: {
      type: Date,
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
