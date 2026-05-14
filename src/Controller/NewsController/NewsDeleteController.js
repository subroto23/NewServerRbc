const { ObjectId } = require("mongodb");
const { handleSuccess } = require("../../Services/SuccessError");
const { NewsModel } = require("../../Dbconfig/DatabaseConfig");

const NewsDeleteController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const id = req.params.id;
    const deleteValue = await NewsModel.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return handleSuccess(res, {
      statusCode: 200,
      message: "সফলভাবে তথ্যটি ডিলেট করা হয়েছে",
      payload: { deleteValue },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = NewsDeleteController;
