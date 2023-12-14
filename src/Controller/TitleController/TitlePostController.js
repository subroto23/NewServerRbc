const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const { titleModel } = require("../../Dbconfig/DatabaseConfig");

const titlePostController = async (req, res, next) => {
  try {
    const { title } = req.body;
    const bodyDatas = {
      title,
    };
    const postData = await titleModel.insertOne(bodyDatas);
    if (!postData) {
      throw createHttpError("আপনার টাইটেল তৈরির আবেদনটি ব্যার্থ হয়েছে।");
    }
    return handleSuccess(res, {
      statusCode: 200,
      message: "আবেদনটি সফল হয়েছে",
      payload: {},
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
module.exports = titlePostController;
