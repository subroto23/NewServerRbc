const express = require("express");
const EventsSendSms = require("./EventEmailSending");
const MonthCadaDueSms = require("./MonthCadaDueSms");
const smsSendRoute = express.Router();

smsSendRoute.post("/events", EventsSendSms);

smsSendRoute.post("/month-cada/due", MonthCadaDueSms);

module.exports = smsSendRoute;
