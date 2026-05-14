const express = require("express");
const appPostsRoute = express.Router();
const VerifyToken = require("../../../Middleware/verifyToken");
const appPostController = require("./controller");

appPostsRoute.post("/", VerifyToken, appPostController.appPostCreateController);
appPostsRoute.get("/", appPostController.appPostAllGetController);
appPostsRoute.get("/:id", appPostController.appPostIdBasedController);
appPostsRoute.delete(
  "/:id",
  VerifyToken,
  appPostController.appPostDeleteController
);
appPostsRoute.get(
  "/user/posts",
  VerifyToken,
  appPostController.appPostUserGetController
);

module.exports = appPostsRoute;
