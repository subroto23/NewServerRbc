const express = require("express");
const eventRoute = express.Router();
const {
  eventsPostController,
} = require("../../Controller/EventsController/EventController");
const {
  getEventController,
} = require("../../Controller/EventsController/GetController");

eventRoute.get("/", getEventController);
eventRoute.post("/create", eventsPostController);
module.exports = eventRoute;
