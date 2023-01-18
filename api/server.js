const express = require("express");
const cors = require("cors");

const userRouter = require("../users/user-router");
const authRouter = require("../auth/auth-router");

const server = express();

server.use(cors());
server.use(express.json());

require("dotenv").config();

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

module.exports = server;
