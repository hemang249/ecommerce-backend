const Product = require("../models/product");
const fm = require("formidable");
const _ = require("lodash");
const fs = require("fs");

module.exports = {
  getProductById: async (req, res, next, id) => {
    console.log("called");
    try {
      const product = await Product.findOne({ _id: id }).populate("category");
      req.product = product;
      next();
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "No Such product exists !" });
    }
  },

  createProduct: async (req, res) => {
    const form = new fm.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, file) => {
      if (err) {
        res.status(400).json({ error: "Invalid file" });
      }

      const { price, name, description, category, stock } = fields;
      const product = new Product({
        name,
        description,
        price,
        category,
        stock,
      });

      if (file.thumbnail) {
        if (file.thumbnail.size > 3000000) {
          res
            .status(400)
            .json({ error: "File size too large! File must not exceed 3mb" });
        }
        product.thumbnail.data = fs.readFileSync(file.thumbnail.path);
        product.thumbnail.contentType = file.thumbnail.type;
      }

      await product.save();
      res.status(200).json(product);
    });
  },

  getThumbnail: async (req, res, next) => {
    if (req.product.thumbnail.data) {
      res.set("Content-Type", req.product.thumbnail.contentType);
      res.send(req.product.thumbnail.data);
      next();
    }
  },

  getSingleProduct: async (req, res) => {
    req.product.thumbnail = undefined;
    res.status(200).json(req.product);
  },

  updateProduct: async (req, res) => {
    const form = new fm.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, file) => {
      if (err) {
        res.status(400).json({ error: "Invalid file" });
      }

      const { price, name, description, category, stock } = fields;
      const product = req.product;
      product = _.extend(product, fields);
      if (file.thumbnail) {
        if (file.thumbnail.size > 3000000) {
          res
            .status(400)
            .json({ error: "File size too large! File must not exceed 3mb" });
        }
        product.thumbnail.data = fs.readFileSync(file.thumbnail.path);
        product.thumbnail.contentType = file.thumbnail.type;
      }

      await product.save();
      res.status(200).json(product);
    });
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find({})
        .select("-thumbnail")
        .populate("category");

      res.status(200).json(products);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "No Products exist" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = req.product;
      await product.remove();
      res.status(200);
    } catch (err) {
      res.status(400).json({ error: "Unable to delete product" });
    }
  },

  updateStock: async (req, res, next) => {
    try {
      let operations = req.body.order.products.map((product) => {
        return {
          updateOne: {
            filter: { _id: product._id },
            update: { $inc: { stock: -product.count, sold: +product.count } },
          },
        };
      });

      const result = await Product.bulkWrite(operations, {});
      res.status(200);
    } catch (err) {
      res.status(400).json({ error: "Bulk Operations Failed" });
    }
  },
};
