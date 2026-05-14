const express = require("express");
const NewsRoute = express.Router();
const newsPostController = require("../../Controller/NewsController/NewsPostController");
const newsGetController = require("../../Controller/NewsController/NewsGetController");
const newsIdBasedController = require("../../Controller/NewsController/NewsIdSearched");
const newsUpdateController = require("../../Controller/NewsController/NewsUpdateController");
const NewsDeleteController = require("../../Controller/NewsController/NewsDeleteController");
const VerifyToken = require("../../../Middleware/verifyToken");
const UserGetControllerPost = require("../../Controller/NewsController/UserGetControllerPost");
NewsRoute.get("/view", newsGetController);
NewsRoute.get("/:id", newsIdBasedController);
NewsRoute.post("/create", VerifyToken, newsPostController);
NewsRoute.put("/update/:id", VerifyToken, newsUpdateController);
NewsRoute.delete("/:id", VerifyToken, NewsDeleteController);
NewsRoute.get("/user/posts", VerifyToken, UserGetControllerPost);

module.exports = NewsRoute;
