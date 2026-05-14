const express = require("express");
const DueGetController = require("../../Controller/DueController/DueGetController");
const DueIdBasedSearchController = require("../../Controller/DueController/DueIdBasedSearch");
const DuePostController = require("../../Controller/DueController/DuePostController");
const DueUpdateController = require("../../Controller/DueController/DueUpdateController");
const DueDeleteController = require("../../Controller/DueController/DueDeleteController");
const DueRoute = express.Router();

DueRoute.get("/", DueGetController);
DueRoute.get("/:id", DueIdBasedSearchController);
DueRoute.post("/create", DuePostController);
DueRoute.put("/update/:id", DueUpdateController);
DueRoute.delete("/:id", DueDeleteController);

module.exports = DueRoute;
