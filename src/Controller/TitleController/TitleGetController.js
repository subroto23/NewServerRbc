const { handleSuccess } = require("../../Services/SuccessError");
const { titleModel } = require("../../Dbconfig/DatabaseConfig");

const titleGetController = async (req, res, next) => {
  try {
    const data = await titleModel.find().toArray();
    return handleSuccess(res, {
      statusCode: 200,
      message: "সফলভাবে ডাটা পাওয়া গিয়েছে",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = titleGetController;
