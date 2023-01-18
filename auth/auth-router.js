const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = require("../users/user-model");

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ errMsg: "Please enter username and password" });
  } else {
    users
      .findUserBy({ username })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);

          res.status(200).json({
            message: `Welcome ${user.firstName}`,
            account: {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              username: user.username,
            },
            token,
          });
        } else {
          return res
            .status(401)
            .json({ errMsg: "Invalid username or password" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errMsg: "A server error has occurred" });
      });
  }
});

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
