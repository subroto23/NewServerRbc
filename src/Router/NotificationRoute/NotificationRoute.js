const express = require("express");
const notificationGetController = require("../../Controller/Notification/notificationGetController");
const notificationPostController = require("../../Controller/Notification/notificationPostController");
const chatNotificationController = require("../../Controller/Notification/notificationChatController");
const sendDailyWishNotification = require("../../Controller/Notification/everyDayWishing");
const birthdayDeathAnniversaryHandler = require("../../Controller/Notification/BirthdayAndDethWish");
const sendDailyEventNotifications = require("../../Controller/Notification/evenDayPushMessage");
const sendMonthDueMessage = require("../../Controller/Notification/monthDueMessage");
const notificaionRoute = express.Router();

notificaionRoute.get("/device/token", notificationGetController);
notificaionRoute.post("/notification", notificationPostController);
notificaionRoute.post("/chat/notification", chatNotificationController);
notificaionRoute.get("/daily/wish", sendDailyWishNotification);
notificaionRoute.get("/check-birthday-death", birthdayDeathAnniversaryHandler);
notificaionRoute.get("/events-message", sendDailyEventNotifications);
notificaionRoute.get("/month-due-message", sendMonthDueMessage);

module.exports = notificaionRoute;
