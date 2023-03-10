const Categories = require("../models/categoryModel");
const Cards = require("../models/cardModel");

// @desc Get categories by user
// @route GET /api/categories
// @access Private
const getUserCategories = async (req, res) => {
  const categories = await Categories.getCategories(req.user.id);

  res.status(200).json(categories);
};

// @desc Get cards by category
// @route GET /api/categories/:categoryId/cards
// @access Private
const getCardsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  const category = await Categories.findCategoryBy({ id: categoryId });

  if (!category) {
    res.status(400).json({ errMsg: "Category not found" });
  } else if (category.userId !== req.user.id) {
    res.status(401).json({ errMsg: "Not authorized" });
  } else {
    const cards = await Cards.getCardsByCategory(categoryId);
    res.status(200).json(cards);
  }
};

// @desc Create category
// @route POST /api/categories
// @access Private
const createCategory = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  if (!title) {
    res.status(404).json({ errMsg: "Please provide a title" });
  } else {
    const category = await Categories.createCategory({ title, userId });
    res.status(201).json(category);
  }
};

// @desc Update category
// @route PATCH /api/categories/:categoryId
// @access Private
const updateCategory = async (req, res) => {
  const { title } = req.body;
  const { categoryId } = req.params;

  if (!title) {
    res.status(404).json({ errMsg: "Please provide a title" });
  } else {
    const udpated = await Categories.updateCategory({ title }, categoryId);
    res.status(200).json(udpated);
  }
};

// @desc Delete category
// @route DELETE /api/categories/:categoryId
// @access Private
const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  await Categories.deleteCategory(categoryId);
  res.status(200).json({ deletedCategory: Number(categoryId) });
};

module.exports = {
  getUserCategories,
  getCardsByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
