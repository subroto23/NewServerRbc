const { titleModel } = require("../../Dbconfig/DatabaseConfig");
const { handleSuccess } = require("../../Services/SuccessError");
const { ObjectId } = require("mongodb");

const titleUpdateController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title } = req.body;
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { title } };
    const options = { new: true };
    const Updated = await titleModel.findOneAndUpdate(filter, update, options);
    return handleSuccess(res, {
      statusCode: 201,
      message: "আপডেট করা হয়েছে",
      payload: { Updated },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = titleUpdateController;
