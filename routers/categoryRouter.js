const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getUserCategories,
  getCardsByCategory,
  createCategory,
  updateCategory,
} = require("../controllers/categoryController");

router.get("/", protect, getUserCategories);

router.get("/:categoryId/cards", protect, getCardsByCategory);

router.post("/", protect, createCategory);

router.patch("/:categoryId", protect, updateCategory);

module.exports = router;
