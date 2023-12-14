const createHttpError = require("http-errors");
const FindById = require("../../helper/FindDataById");
const { handleSuccess } = require("../../Services/SuccessError");
const { DueModel } = require("../../Dbconfig/DatabaseConfig");
const { ObjectId } = require("mongodb");

const DueUpdateController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { paidTk, due } = req.body;
    const filter = await DueModel.findOne({ _id: new ObjectId(id) });
    const update = { $set: { paidTk, due } };
    const options = { new: true };
    const Updated = await DueModel.updateOne(filter, update, options);
    return handleSuccess(res, {
      statusCode: 201,
      message: "আপডেট করা হয়েছে",
      payload: { Updated },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = DueUpdateController;
