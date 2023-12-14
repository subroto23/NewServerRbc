const express = require("express");
const titlePostController = require("../../Controller/TitleController/TitlePostController");
const titleGetController = require("../../Controller/TitleController/TitleGetController");
const titleGetByIdController = require("../../Controller/TitleController/TitleIdBasedSearch");
const titleUpdateController = require("../../Controller/TitleController/TitleUpdateController");
const titleDeleteController = require("../../Controller/TitleController/TitleDeleteController");
const TittleRoute = express.Router();

//title/heading
TittleRoute.get("/", titleGetController);
TittleRoute.get("/:id", titleGetByIdController);
TittleRoute.post("/create", titlePostController);
TittleRoute.put("/update/:id", titleUpdateController);
TittleRoute.delete("/:id", titleDeleteController);

module.exports = TittleRoute;
