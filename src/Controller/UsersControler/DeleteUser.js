const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const FindById = require("../../helper/FindDataById");
const userSchemaModel = require("../../Modele/UsersModel/UsersModel");

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    //Function  Call get Data By Id
    const user = await FindById(userSchemaModel, id);

    const deleteUser = await userSchemaModel.findByIdAndDelete(
      id,
      (isAdmin = false)
    );

    if (!deleteUser) {
      throw createHttpError("User Not exist and can not be deleted");
    }
    return handleSuccess(res, {
      statusCode: 201,
      message: "User Was Deleted Successfully",
    });
  } catch (error) {
    next(createHttpError(404, "Id Based user not Found"));
  }
};
module.exports = deleteUser;
