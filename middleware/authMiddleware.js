const jwt = require("jsonwebtoken");

const Users = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await Users.findUserBy({ id: decoded.id }).select(
        "id",
        "firstName",
        "lastName",
        "email"
      );

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401).json({ errMsg: "Not authorized, no token" });
    // throw new Error("Not authorized, no token");
  }
};

module.exports = { protect };
