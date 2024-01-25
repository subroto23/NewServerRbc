const express = require("express");
const cadaPostController = require("../../Controller/Cada/CadaPostController");
const cadaGetController = require("../../Controller/Cada/CadaGetController");
const CadaUpdateController = require("../../Controller/Cada/CadaUpdateController");
const cadaGetByIdController = require("../../Controller/Cada/cadaGetByIdController");
const cadaDeleteById = require("../../Controller/Cada/CadaDeleteById");
const VerifyToken = require("../../../Middleware/verifyToken");
const CadaRoute = express.Router();

CadaRoute.get("/", VerifyToken, cadaGetController);
CadaRoute.get("/:id", VerifyToken, cadaGetByIdController);
CadaRoute.post("/create", VerifyToken, cadaPostController);
CadaRoute.patch("/update/:id", VerifyToken, CadaUpdateController);
CadaRoute.delete("/:id", VerifyToken, cadaDeleteById);

module.exports = CadaRoute;
