const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const users = require("./user-model");

router.post("/", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  users
    .createUser(user)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errMsg: "Unable to create user" });
    });
});

module.exports = router;
