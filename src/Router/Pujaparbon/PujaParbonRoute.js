const express = require("express");
const PujaparbonPostController = require("../../Controller/PujaParbon/PujaparbonPostController");
const PujaparbonGetController = require("../../Controller/PujaParbon/PujaparbonGetController");
const pujaparbonRoute = express.Router();

pujaparbonRoute.get("/", PujaparbonGetController);
pujaparbonRoute.post("/create", PujaparbonPostController);
module.exports = pujaparbonRoute;
