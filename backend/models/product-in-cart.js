const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productInCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },

  name: String,
  count: Number,
  netPrice: Number,
});

const ProductInCart = mongoose.model("ProductInCart", productInCartSchema);

module.exports = ProductInCart;
