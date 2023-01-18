const Categories = require("../models/categoryModel");

// @desc Get categories by user
// @route GET /api/categories
// @access Private
const getUserCategories = async (req, res) => {
  const categories = await Categories.getCategories(req.user.id);

  res.status(200).json(categories);
};

module.exports = { getUserCategories };
