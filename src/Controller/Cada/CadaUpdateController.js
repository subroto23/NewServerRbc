const { Cada } = require("../../Dbconfig/DatabaseConfig");
const { handleSuccess } = require("../../Services/SuccessError");
const { ObjectId } = require("mongodb");

const CadaUpdateController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, fixedTk, paidTk } = req.body;
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { name, fixedTk, paidTk } };
    const options = { new: true };
    const Updated = await Cada.findOneAndUpdate(filter, update, options);
    return handleSuccess(res, {
      statusCode: 201,
      message: "আপডেট করা হয়েছে",
      payload: Updated,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = CadaUpdateController;
