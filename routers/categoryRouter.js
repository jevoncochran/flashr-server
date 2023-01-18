const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const { getUserCategories } = require("../controllers/categoryController");

router.get("/", protect, getUserCategories);

module.exports = router;
