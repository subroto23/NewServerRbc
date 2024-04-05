const express = require("express");
const earnValues = require("./controller");
const earnRoutes = express.Router();

earnRoutes.post("/create-earns", earnValues.createEarnController);
earnRoutes.get("/", earnValues.getAllEarnController);
earnRoutes.get("/:id", earnValues.getSingleEarnController);
earnRoutes.delete("/delete/:id", earnValues.deleteEarnController);
earnRoutes.patch("/update", earnValues.updateEarnController);
module.exports = earnRoutes;
