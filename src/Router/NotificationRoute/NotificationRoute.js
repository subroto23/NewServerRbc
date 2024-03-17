const express = require("express");
const notificationGetController = require("../../Controller/Notification/notificationGetController");
const notificationPostController = require("../../Controller/Notification/notificationPostController");
const notificaionRoute = express.Router();

notificaionRoute.get("/device/token", notificationGetController);
notificaionRoute.post("/notification", notificationPostController);

module.exports = notificaionRoute;
