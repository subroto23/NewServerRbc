const { ObjectId } = require("mongodb");
const { handleSuccess } = require("../../Services/SuccessError");
const { NewsModel } = require("../../Dbconfig/DatabaseConfig");

const newsUpdateController = async (req, res, next) => {
  try {
    const { title, details } = req?.body;
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const id = req?.params?.id;
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { title, details } };
    const options = { new: true };
    const Updated = await NewsModel.updateOne(filter, update, options);
    return handleSuccess(res, {
      statusCode: 201,
      message: "আপডেট করা হয়েছে",
      payload: { Updated },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = newsUpdateController;
