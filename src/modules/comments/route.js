const express = require("express");
const appCommentRoute = express.Router();
const appPostCommentController = require("./controller");

appCommentRoute.post(
  "/create-comment",
  appPostCommentController.appCommentPost
);

appCommentRoute.post(
  "/create-reaction",
  appPostCommentController.appReactionPost
);

module.exports = appCommentRoute;
