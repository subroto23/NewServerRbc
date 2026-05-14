const express = require("express");
const csvOrPdfController = require("./csvOrPdfDownlo9ad");
const csvOrPdfRoute = express.Router();

csvOrPdfRoute.get("/pdf", csvOrPdfController.getAllEarnPdfGenerator);

module.exports = csvOrPdfRoute;