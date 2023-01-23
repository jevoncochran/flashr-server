const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getUserCategories,
  getCardsByCategory,
  createCategory,
} = require("../controllers/categoryController");

router.get("/", protect, getUserCategories);

router.get("/:categoryId/cards", protect, getCardsByCategory);

router.post("/", protect, createCategory);

module.exports = router;
