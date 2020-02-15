const express = require("express");
const teachers = require("../models/teachers");

const teachersRouter = express.Router();

teachersRouter.get("/", (req, res) => {
  res.status(200).json({ teachers });
});

module.exports = teachersRouter;
