const { handleSuccess } = require("../../Services/SuccessError");
const { ObjectId } = require("mongodb");
const { Cada } = require("../../Dbconfig/DatabaseConfig");

const cadaGetByIdController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const id = req?.params?.id;
    const dataValue = await Cada.findOne({ _id: new ObjectId(id) });
    return handleSuccess(res, {
      statusCode: 200,
      message: "সফলভাবে তথ্যটি পাওয়া গিয়েছে",
      payload: dataValue,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = cadaGetByIdController;
