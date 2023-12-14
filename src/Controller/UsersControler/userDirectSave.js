const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const userSchemaModel = require("../../Modele/UsersModel/UsersModel");
const userDirectRegistation = async (req, res, next) => {
  try {
    const {
      name,
      fathername,
      mothername,
      email,
      dateOfBirth,
      phone,
      password,
    } = req.body;

    // const imageBufferString = await req.file.buffer.toString("base64");
    const imageBuffer = await req.file.buffer.toString("base64");

    const users = {
      name,
      fathername,
      mothername,
      email,
      password,
      phone,
      dateOfBirth,
      image: imageBuffer,
    };
    const isExists = await userSchemaModel.exists({ email });

    if (isExists) {
      throw createHttpError(409, "Email already exists");
    }
    const newUserData = await userSchemaModel.create(users);
    if (!newUserData) {
      throw createHttpError("User Not created");
    }
    return handleSuccess(res, {
      statusCode: 202,
      message: `User Created Successfully`,
      payload: { newUserData },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userDirectRegistation;
