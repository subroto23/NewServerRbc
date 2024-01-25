const { Cada } = require("../../Dbconfig/DatabaseConfig");
const { handleSuccess } = require("../../Services/SuccessError");

const cadaPostController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const { name, fixedTk, paidTk } = req.body;
    const bodyDatas = {
      name,
      fixedTk,
      paidTk,
    };
    const postData = await Cada.insertOne(bodyDatas);
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
module.exports = cadaPostController;
