const express = require("express");
const SpendValues = require("./controller");
const spendRoutes = express.Router();

spendRoutes.post("/create-spends", SpendValues.createSpendController);
spendRoutes.get("/", SpendValues.getAllSpendController);
spendRoutes.get("/:id", SpendValues.getSingleSpendController);
spendRoutes.delete("/delete/:id", SpendValues.deleteSpendController);
spendRoutes.patch("/update", SpendValues.updateSpendController);

module.exports = spendRoutes;
