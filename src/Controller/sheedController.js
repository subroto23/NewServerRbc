const createHttpError = require("http-errors");
const userSchemaModel = require("../Modele/UsersModel/UsersModel");
const data = require("../Modele/SheedUser/SheedUser");
const { handleSuccess } = require("../Services/SuccessError");

const sheedController = async (req, res, next) => {
  try {
    //Previous storages Delete
    await userSchemaModel.deleteMany({});

    const users = await userSchemaModel.insertMany(data.user);

    return handleSuccess(res, {
      statusCode: 200,
      message: "Sheed Users created successfully",
      payload: users,
    });
  } catch (error) {
    next(createHttpError(501, "Sheed Users Not created at this time"));
  }
};

module.exports = { sheedController };
