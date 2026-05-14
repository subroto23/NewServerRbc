const cron = require("node-cron");
const nodemailer = require("nodemailer");
const moment = require("moment");
const { smtpPasswordLatest, userEmail } = require("../secret");
const { monthcada } = require("../Dbconfig/DatabaseConfig");
const calculateTotalMonths = require("../utlis/calculateTotalMonths");
const previousMonthGenerator = require("../utlis/PreviousMonthGenerator");
//Monthly Dues Scheduler Email Sends

const monthlyDueSms = async () => {
  //Monthly Dues Generator
};
module.exports = monthlyDueSms;
