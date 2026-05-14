const express = require("express");
const titlePostController = require("../../Controller/TitleController/TitlePostController");
const titleGetController = require("../../Controller/TitleController/TitleGetController");
const titleGetByIdController = require("../../Controller/TitleController/TitleIdBasedSearch");
const titleUpdateController = require("../../Controller/TitleController/TitleUpdateController");
const titleDeleteController = require("../../Controller/TitleController/TitleDeleteController");
const VerifyToken = require("../../../Middleware/verifyToken");
const TittleRoute = express.Router();

//title/heading
TittleRoute.get("/", titleGetController);
TittleRoute.get("/:id", VerifyToken, titleGetByIdController);
TittleRoute.post("/create", VerifyToken, titlePostController);
TittleRoute.put("/update/:id", VerifyToken, titleUpdateController);
TittleRoute.delete("/:id", VerifyToken, titleDeleteController);

module.exports = TittleRoute;
