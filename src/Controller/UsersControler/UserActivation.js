const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");

const jwt = require("jsonwebtoken");
const { jsonWebTokensKey } = require("../../secret");
const userSchemaModel = require("../../Modele/UsersModel/UsersModel");
const UserActivation = async (req, res, next) => {
  try {
    const token = req.params.token;
    console.log(token);
    if (!token)
      throw createHttpError(
        "Expired verification email times.Please try again later"
      );
    const decoded = jwt.verify(token, jsonWebTokensKey);
    if (!decoded)
      throw createHttpError("You are not verified User.Please Sign UP againg");

    const isExistUser = await userSchemaModel.exists({ email: decoded.email });
    if (isExistUser) {
      throw createHttpError("User Already registered in email");
    }

    //Create USer and Save Data
    await userSchemaModel.create(decoded);

    return handleSuccess(res, {
      statusCode: 202,
      message: "Activation Successfully.Please Login",
    });
  } catch (error) {
    next(createHttpError(404, "Registation request failed", error));
  }
};
module.exports = UserActivation;
