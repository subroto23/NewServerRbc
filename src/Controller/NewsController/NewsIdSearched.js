const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const { ObjectId } = require("mongodb");
const { NewsModel } = require("../../Dbconfig/DatabaseConfig");

const newsIdBasedController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newsDetails = await NewsModel.findOne({ _id: new ObjectId(id) });
    if (!newsDetails) {
      throw createHttpError("নিউজটি খুজে পাওয়া যায় নি");
    }
    return handleSuccess(res, {
      statusCode: 201,
      message: "নিউজটি সফলভাবে পাওয়া গিয়েছে",
      payload: { newsDetails },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = newsIdBasedController;
