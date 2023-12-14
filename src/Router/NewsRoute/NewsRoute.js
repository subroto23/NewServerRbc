const express = require("express");
const NewsRoute = express.Router();
const newsPostController = require("../../Controller/NewsController/NewsPostController");
const newsGetController = require("../../Controller/NewsController/NewsGetController");
const newsIdBasedController = require("../../Controller/NewsController/NewsIdSearched");
const newsUpdateController = require("../../Controller/NewsController/NewsUpdateController");
const NewsDeleteController = require("../../Controller/NewsController/NewsDeleteController");
NewsRoute.get("/view", newsGetController);
NewsRoute.get("/:id", newsIdBasedController);
NewsRoute.post("/create", newsPostController);
NewsRoute.put("/update/:id", newsUpdateController);
NewsRoute.delete("/:id", NewsDeleteController);

module.exports = NewsRoute;
