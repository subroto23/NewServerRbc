const express = require("express");
const cadaPostController = require("../../Controller/Cada/CadaPostController");
const cadaGetController = require("../../Controller/Cada/CadaGetController");
const CadaUpdateController = require("../../Controller/Cada/CadaUpdateController");
const cadaGetByIdController = require("../../Controller/Cada/cadaGetByIdController");
const cadaDeleteById = require("../../Controller/Cada/CadaDeleteById");
const CadaRoute = express.Router();

CadaRoute.get("/", cadaGetController);
CadaRoute.get("/:id", cadaGetByIdController);
CadaRoute.post("/create", cadaPostController);
CadaRoute.put("/update/:id", CadaUpdateController);
CadaRoute.delete("/:id", cadaDeleteById);

module.exports = CadaRoute;
