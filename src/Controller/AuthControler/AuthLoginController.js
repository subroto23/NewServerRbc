const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookie = require("cookie-parser");
const userSchemaModel = require("../../Modele/UsersModel/UsersModel");
const { handleSuccess } = require("../../Services/SuccessError");
const { jsonWebTokensKey, authLoginKey } = require("../../secret");
const { CreateJsonWebToken } = require("../../helper/createJsonWebTokens");

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userInfo = await userSchemaModel.findOne({ email });
    if (!userInfo) {
      throw createHttpError(406, "Your Email not found");
    }
    const mathcPassword = await bcrypt.compare(password, userInfo.password);
    if (!mathcPassword) {
      throw createHttpError("Password is incorrect.Please try again");
    }

    if (userInfo.isBanned) {
      throw createHttpError(
        "Sorry! You are not allowed to Login.please contact authority"
      );
    }
    const token = CreateJsonWebToken({ userInfo }, authLoginKey, "60d");
    if (!token) {
      throw createHttpError("Token generated failed");
    }

    res.cookie("access_login_token", token, {
      maxAge: 60 * 60 * 24 * 1000 * 60,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    return handleSuccess(res, {
      statusCode: 200,
      message: "Successfully Logged In",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};
module.exports = handleLogin;
