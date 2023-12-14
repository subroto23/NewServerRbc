const express = require("express");
const authRouter = express.Router();
const handleLogin = require("../../Controller/AuthControler/AuthLoginController");
const handleLogOut = require("../../Controller/AuthControler/AuthLogOut");
const isLogedOut = require("../../Middleware/isLogedOut");
const isLogedIn = require("../../Middleware/isLogedin");
const { validateLogIn } = require("../../Validator/Auth");
const runValidations = require("../../Validator");

//Login Router
authRouter.post(
  "/login",
  isLogedOut,
  validateLogIn,
  runValidations,
  handleLogin
);
//LogOut
authRouter.post("/logout", isLogedIn, handleLogOut);

module.exports = authRouter;
