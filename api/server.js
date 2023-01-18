const express = require("express");
const cors = require("cors");

// Take this out and only keep authRouter
const userRouter = require("../routers/userRouter");
const authRouter = require("../routers/authRouter");
const categoryRouter = require("../routers/categoryRouter");

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
server.use("/api/categories", categoryRouter);

module.exports = server;
