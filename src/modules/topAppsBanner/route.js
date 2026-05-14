const express = require("express");
const topBannerController = require("./controller");
const topAppsBannerRoutes = express.Router();

topAppsBannerRoutes.post("/", topBannerController.topAppsBannerPostController);
topAppsBannerRoutes.get("/", topBannerController.topAppsBannerAllGetController);
topAppsBannerRoutes.delete(
  "/:id",
  topBannerController.topAppsBannerDeleteController
);
module.exports = topAppsBannerRoutes;
