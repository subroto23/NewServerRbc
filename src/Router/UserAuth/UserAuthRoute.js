const express = require("express");
const UserAuthPostController = require("../../Controller/UserAuth/UserAuthPostController");
const VerifyToken = require("../../../Middleware/verifyToken");
const UsergetController = require("../../Controller/UserAuth/UsergetController");
const UsergetIdController = require("../../Controller/UserAuth/UsergetIdController");
const UserPatchController = require("../../Controller/UserAuth/UserPatchController");
const UserDeleteController = require("../../Controller/UserAuth/UserDeleteController");
const AuthRouter = express.Router();

AuthRouter.get("/auth/user", VerifyToken, UsergetController);
AuthRouter.get("/auth/user/:id", VerifyToken, UsergetIdController);
AuthRouter.post("/auth/create", UserAuthPostController);
AuthRouter.patch("/auth/user/update/:id", VerifyToken, UserPatchController);
AuthRouter.delete("/auth/user/delete/:id", VerifyToken, UserDeleteController);
module.exports = AuthRouter;
