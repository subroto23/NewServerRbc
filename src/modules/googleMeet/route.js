const express = require("express");
const googleMeetRoute = express.Router();
const VerifyToken = require("../../../Middleware/verifyToken");

const {
  googleMeetCreateUpdateController,
  googleMeetGetController,
  googleMeetDeleteController,
} = require("./controller");

// Create / Update
googleMeetRoute.post(
  "/",
  VerifyToken,
  googleMeetCreateUpdateController
);
                                                                        
// Get
googleMeetRoute.get(
  "/",
  googleMeetGetController
);


module.exports = googleMeetRoute;