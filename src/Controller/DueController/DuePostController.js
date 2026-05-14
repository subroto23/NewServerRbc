const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const { DueModel } = require("../../Dbconfig/DatabaseConfig");

const DuePostController = async (req, res, next) => {
  try {
    const { name, source, fixedTk, paidTk } = req.body;
    const bodyDatas = {
      name,
      source,
      fixedTk,
      paidTk,
    };
    const postData = await DueModel.insertOne(bodyDatas);
    if (!postData) {
      throw createHttpError("আপনার আবেদনটি ব্যার্থ হয়েছে।");
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
module.exports = DuePostController;
