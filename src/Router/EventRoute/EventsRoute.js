const express = require("express");
const eventRoute = express.Router();
const {
  eventsPostController,
} = require("../../Controller/EventsController/EventController");
const {
  getEventController,
} = require("../../Controller/EventsController/GetController");
const VerifyToken = require("../../../Middleware/verifyToken");
const getEventUserController = require("../../Controller/EventsController/getEventUserController");
const eventsDeleteController = require("../../Controller/EventsController/EventDeleteControler");

eventRoute.get("/", getEventController);
eventRoute.get("/user/event", VerifyToken, getEventUserController);
eventRoute.post("/create", VerifyToken, eventsPostController);
eventRoute.delete("/delete/:id", VerifyToken, eventsDeleteController);
module.exports = eventRoute;
