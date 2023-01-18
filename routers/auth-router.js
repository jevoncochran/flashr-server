const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = require("../models/user-model");
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

const generateToken = (user) => {
  const payload = {
    id: user.id,
  };

  const secret = "top secret";

  const options = {
    expiresIn: "24h",
  };

  return jwt.sign(payload, secret, options);
};

module.exports = router;
