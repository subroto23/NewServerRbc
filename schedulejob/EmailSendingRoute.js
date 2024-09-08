const express = require("express");
const EventsSendSms = require("./EventEmailSending");
const MonthCadaDueSms = require("./allusersSendEmail");
const enventSmsSendAutometic = require("./eventSmsSendAutometic");
const monthCadaAutometicSend = require("./monthCadaAutoSma/monthCadaAutometic");
const smsSendRoute = express.Router();

smsSendRoute.post("/events", EventsSendSms);
smsSendRoute.post("/events/auto", enventSmsSendAutometic);

smsSendRoute.post("/month-cada/due", MonthCadaDueSms);
smsSendRoute.post("/month-cada/auto", monthCadaAutometicSend);

module.exports = smsSendRoute;
