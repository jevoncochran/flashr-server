const bcrypt = require("bcryptjs");
const Users = require("../models/user-model");

// @desc Register user
// @route POST /api/auth
// @access Public
const registerUser = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ errMsg: "Please add all fieds" });
  }

  // Check if user exists
  const userExists = await Users.findUserBy({ email });

  if (userExists) {
    res.status(400).json({ errMsg: "User already exists" });
  }

  const hash = bcrypt.hashSync(password, 8);
  password = hash;

  Users.createUser({ firstName, lastName, email, password })
    .then((newUser) => {
      res.status(201).json({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errMsg: "Unable to create user" });
    });
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ errMsg: "Please enter email and password" });
  } else {
    Users.findUserBy({ email })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          });
        } else {
          res.status(401).json({ errMsg: "Invalid email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errMsg: "Login failed" });
      });
  }
};

module.exports = { registerUser, loginUser };
