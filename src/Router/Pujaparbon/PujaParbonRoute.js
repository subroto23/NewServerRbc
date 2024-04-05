const express = require("express");
const PujaparbonPostController = require("../../Controller/PujaParbon/PujaparbonPostController");
const PujaparbonGetController = require("../../Controller/PujaParbon/PujaparbonGetController");
const pujaParbonSingleGet = require("../../Controller/PujaParbon/pujaParbonSingleGet");
const pujaparbonRoute = express.Router();

pujaparbonRoute.get("/", PujaparbonGetController);
pujaparbonRoute.get("/single/puja/:id", pujaParbonSingleGet);
pujaparbonRoute.post("/create", PujaparbonPostController);
module.exports = pujaparbonRoute;
