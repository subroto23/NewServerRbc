const express = require("express");
const {
  getUsersController,
} = require("../Controller/UsersControler/UsersControlers");
const searchingUsers = require("../Controller/UsersControler/searchingUsers");
const getUserById = require("../Controller/UsersControler/getUserById");
const deleteUser = require("../Controller/UsersControler/DeleteUser");
const { validateRegistation } = require("../Validator/Auth");
const runValidations = require("../Validator");
const upload = require("../Middleware/UploadFile");
const {
  userRegistation,
} = require("../Controller/UsersControler/UserRegistation");
// const UserActivation = require("../Controller/UsersControler/UserActivation");
const updateUser = require("../Controller/UsersControler/updateUser");
const isLogedIn = require("../Middleware/isLogedin");
const isLogedOut = require("../Middleware/isLogedOut");
const isAdmin = require("../Middleware/isAdmin");
const isBanned = require("../Middleware/isBanned");
const userDirectRegistation = require("../Controller/UsersControler/userDirectSave");
// const handleLogin = require("../Controller/UsersControler/UserLogin");
const userRouter = express.Router();
//Users registations
userRouter.post("/signup", upload.single("image"), userDirectRegistation);

//user Login
// userRouter.post("/login", handleLogin);

//users Router Creating => /api/users
userRouter.get("/", getUsersController);

//Find Users by Searching => api/users/filter?search = subroto
userRouter.get("/filters", isLogedIn, searchingUsers);

//Find Users By email => api/users/:id
userRouter.get("/email", getUserById);

//Update User Data
userRouter.put("/update/:id", isLogedIn, upload.single("img"), updateUser);

//Delete Data with find Id => api/users/:id
userRouter.delete("/delete/:id", isLogedIn, deleteUser);

userRouter.get("/profile", (req, res, next) => {
  res.send("Welcome Logged in User");
});
//

module.exports = userRouter;
