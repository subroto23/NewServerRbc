const express = require("express");
const MonthCadaPostController = require("../../Controller/MonthCadaController/MonthCadaPostController");
const VerifyToken = require("../../../Middleware/verifyToken");
const MonthCadaGetController = require("../../Controller/MonthCadaController/MonthCadaGetController");
const MonthCadaAdminGetController = require("../../Controller/MonthCadaController/MonthCadaAdminGetController");
const verifyAdmin = require("../../../Middleware/verifyAdmin");
const MonthCadaRoute = express.Router();

//post Req
MonthCadaRoute.get("/", VerifyToken, MonthCadaGetController);
MonthCadaRoute.get(
  "/admin",
  // VerifyToken,
  // verifyAdmin,
  MonthCadaAdminGetController
);
MonthCadaRoute.post("/create", VerifyToken, MonthCadaPostController);
module.exports = MonthCadaRoute;
