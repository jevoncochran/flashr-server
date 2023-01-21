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

      // Added this if statement to prevent server from crashing after logout when token gets removed
      // Without the top part of if statement, jwt.verify was being run with undefined token
      // This would crash the server with a jwt malformed error
      // Read more about this error via StackOverflow: https://stackoverflow.com/questions/51849010/json-web-token-verify-return-jwt-malformed/51849197#51849197
      if (!token) {
        res.status(401).json({ errMsg: "Not authorized, no token" });
      } else {
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
      }
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  } else {
    res.status(401).json({ errMsg: "Not authorized, no token" });
  }
};

module.exports = { protect };
