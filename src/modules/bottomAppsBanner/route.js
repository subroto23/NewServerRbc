const express = require("express");
const bottomBannerController = require("./controller");
const bottomAppsBannerRoutes = express.Router();

bottomAppsBannerRoutes.post(
  "/",
  bottomBannerController.bottomAppsBannerPostController
);
bottomAppsBannerRoutes.get(
  "/",
  bottomBannerController.bottomAppsBannerAllGetController
);
bottomAppsBannerRoutes.delete(
  "/:id",
  bottomBannerController.bottomAppsBannerDeleteController
);

module.exports = bottomAppsBannerRoutes;
