const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const { NewsModel } = require("../../Dbconfig/DatabaseConfig");
const newsGetController = async (req, res, next) => {
  try {
    const allNews = await NewsModel.find().toArray();
    allNews.reverse();
    if (!allNews) {
      throw createHttpError("এই মুহুর্তে ডাটাবেজে কোনো নিউজ নেই");
    }
    return handleSuccess(res, {
      statusCode: 201,
      message: "All News Successfully returned",
      payload: {
        allNews,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = newsGetController;
