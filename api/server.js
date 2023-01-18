const express = require("express");
const cors = require("cors");

// Take this out and only keep authRouter
const userRouter = require("../routers/user-router");
const authRouter = require("../routers/auth-router");

const server = express();

server.use(cors());
server.use(express.json());

require("dotenv").config();

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

// Take out userRouter middleware
server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

module.exports = server;
