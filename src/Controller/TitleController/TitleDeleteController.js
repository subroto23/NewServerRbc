const { ObjectId } = require("mongodb");
const { titleModel } = require("../../Dbconfig/DatabaseConfig");

const titleDeleteController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const id = req.params.id;
    const deleteValue = await titleModel.findOneAndDelete({
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

module.exports = titleDeleteController;
