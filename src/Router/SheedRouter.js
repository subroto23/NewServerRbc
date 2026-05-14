const express = require("express");
const { sheedController } = require("../Controller/sheedController");
const sheedRouter = express.Router();

sheedRouter.get("/", sheedController);

module.exports = sheedRouter;
