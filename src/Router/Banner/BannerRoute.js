const express = require("express");
const bannerPostController = require("../../Controller/banner/bannerPostController");
const bannerAllGetController = require("../../Controller/banner/BannnerGetController");
const bannerDeleteController = require("../../Controller/banner/bannerDeleteController");
const bannerRouter = express.Router();

bannerRouter.get("/banners", bannerAllGetController);
bannerRouter.post("/create-banner", bannerPostController);
bannerRouter.delete("/banners/delete/:id", bannerDeleteController);

module.exports = bannerRouter;
