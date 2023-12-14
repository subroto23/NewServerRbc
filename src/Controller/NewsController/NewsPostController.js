const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const { NewsModel } = require("../../Dbconfig/DatabaseConfig");

const newsPostController = async (req, res, next) => {
  try {
    const { title, image, details } = req.body;
    const dataValues = {
      date: new Date(),
      title,
      details,
      image,
    };
    const publishNews = await NewsModel.insertOne(dataValues);
    //
    return handleSuccess(res, {
      statusCode: 200,
      message: "নিউজটি সফলভাবে পাবলিশ করা হয়েছে",
      payload: { publishNews },
    });
  } catch (error) {
    next(
      createHttpError(
        "দুঃখিত এই মুহুর্তে নিউজটি পাবলিশ করা সম্ভব হচ্ছে না।আবার চেষ্টা করুন"
      )
    );
  }
};

module.exports = newsPostController;
