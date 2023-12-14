const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const { DueModel } = require("../../Dbconfig/DatabaseConfig");

const DueGetController = async (req, res, next) => {
  try {
    const data = await DueModel.find().toArray();
    if (!data) {
      throw createHttpError("ডাটা খুজে পাওয়া যায় নি");
    }
    return handleSuccess(res, {
      statusCode: 200,
      message: "সফলভাবে ডাটা পাওয়া গিয়েছে",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = DueGetController;
