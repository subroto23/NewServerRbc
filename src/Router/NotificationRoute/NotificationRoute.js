const express = require("express");
const notificationGetController = require("../../Controller/Notification/notificationGetController");
const notificationPostController = require("../../Controller/Notification/notificationPostController");
const chatNotificationController = require("../../Controller/Notification/notificationChatController");
const notificaionRoute = express.Router();

notificaionRoute.get("/device/token", notificationGetController);
notificaionRoute.post("/notification", notificationPostController);
notificaionRoute.post("/chat/notification", chatNotificationController);

module.exports = notificaionRoute;
