const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const { ObjectId } = require("mongodb");
const { titleModel } = require("../../Dbconfig/DatabaseConfig");

const titleGetByIdController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const id = req.params.id;
    console.log(id);
    const dataValue = await titleModel.findOne({ _id: new ObjectId(id) });
    if (!dataValue) {
      throw createHttpError("তথ্যটি খুজে পাওয়া যাচ্ছে না।");
    }
    return handleSuccess(res, {
      statusCode: 200,
      message: "সফলভাবে তথ্যটি পাওয়া গিয়েছে",
      payload: { dataValue },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = titleGetByIdController;
