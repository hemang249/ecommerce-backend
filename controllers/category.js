const Category = require("../models/category");

module.exports = {
  getCategoryById: async (req, res, next, id) => {
    try {
      const category = await Category.findOne({ _id: id });
      req.category = category;
      next();
    } catch (err) {
      res.status(400).json({ error: "No Such category exist" });
    }
  },

  createCategory: async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ error: "Unable to create new category" });
    }
  },

  getSingleCategory: async (req, res) => {
    res.status(200).json(req.category);
  },

  getAllCategories: async (req, res, next) => {
    try {
      const categories = await Category.find({});
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: "Something went wrong on the server !" });
    }
  },

  updateCategory: async (req, res) => {
    try {
      let category = req.category;
      category.name = req.body.name;
      const updatedCategory = await category.save();
      res.status(200).json(updatedCategory);
    } catch (err) {
      res.status(400).json({ error: "Update Failed" });
    }
  },

  deleteSingleCategory: async (req, res) => {
    try {
      const catergory = req.category;
      await Category.deleteOne({ _id: catergory._id });
      res.status(200);
    } catch (err) {
      res.status(400).json({ error: "Unable to delete category" });
    }
  },
};
