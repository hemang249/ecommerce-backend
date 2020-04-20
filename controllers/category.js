const Category = require("../models/category");

module.exports = {
  getCategoryById: async (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
      if (err) {
        res.status(404).json({ error: "Category doesnot exist" });
      }
      req.category = category;
    });
    next();
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
    res.status(200).json({ ...req.category });
  },

  getAllCategories: async (req, res, next) => {
    try {
      const categories = await Category.find({});
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: "Something went wrong on the server !" });
    }
  },

  updateCategory: async (req, res, next) => {
    try {
      const category = req.catergory;
      category.name = req.body.name;
      const updatedCategory = category.save();
      res.status(200).json(updatedCategory);
    } catch (err) {
      res.status(400).json({ error: "Update Failed" });
    }
  },
};
