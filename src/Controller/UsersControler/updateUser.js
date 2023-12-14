const createHttpError = require("http-errors");
const userSchemaModel = require("../../Modele/UsersModel/UsersModel");
const FindById = require("../../helper/FindDataById");
const { handleSuccess } = require("../../Services/SuccessError");

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateUserOldData = await FindById(userSchemaModel, userId);
    const updateUserOptions = {
      new: true,
      runValidations: true,
      context: "query",
    };

    let updatedUser = {};
    for (let key in req.body) {
      if (["name", "phone", "dateOfBirth", "dateOfDead"].includes(key)) {
        updatedUser[key] = req.body[key];
      } else if (["email"].includes(key)) {
        return createHttpError("Sorry !! Email not Changed");
      }
    }

    const image = req.file;
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createHttpError(
          301,
          "Your Image size is too large.please try again later."
        );
      }
    }
    if (image) {
      updatedUser.img = image.buffer.toString("base64");
    }
    if (!updatedUser) {
      throw createHttpError(404, "User Update not possible at this time...");
    }

    const updatedValue = await userSchemaModel
      .findByIdAndUpdate(userId, updatedUser, updateUserOptions)
      .select("-password");
    if (!updatedValue) {
      throw createHttpError("Update not possible at this time");
    }
    return handleSuccess(res, {
      statusCode: 200,
      message: "Updated Successfully",
      payload: { updatedValue },
    });
  } catch (error) {
    return createHttpError(412, "User Update Failed");
  }
};

module.exports = updateUser;
