const createHttpError = require("http-errors");

const FindById = async (model, id) => {
  try {
    const options = { password: 0 };

    const datas = await model.findById({ _id: id }, options);

    if (!datas) {
      throw createHttpError(403, "Sorry!!  User Id not Mathched!!");
    }
    return datas;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createHttpError(505, "User ID not found in database");
    }
    throw error;
  }
};
module.exports = FindById;
