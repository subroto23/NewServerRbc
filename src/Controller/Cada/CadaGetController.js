const { handleSuccess } = require("../../Services/SuccessError");
const { Cada } = require("../../Dbconfig/DatabaseConfig");

const cadaGetController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const data = await Cada.find().toArray();
    return handleSuccess(res, {
      statusCode: 200,
      message: "সফলভাবে ডাটা পাওয়া গিয়েছে",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = cadaGetController;
