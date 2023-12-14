const createHttpError = require("http-errors");
const userSchemaModel = require("../../Modele/UsersModel/UsersModel");
const { handleSuccess } = require("../../Services/SuccessError");

const getUsersController = async (req, res, next) => {
  try {
    const options = { password: 0 };
    const users = await userSchemaModel.find().select("-password");
    if (!users) {
      throw createHttpError(404, "User not Found");
    }

    return handleSuccess(res, {
      statusCode: 201,
      message: "All Users Successfully Returned",
      payload: { users },
    });
  } catch (error) {
    next(createHttpError(404, "Internal Server Problem All users Data"));
  }
};

module.exports = { getUsersController };
