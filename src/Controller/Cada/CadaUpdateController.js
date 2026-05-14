const { Cada } = require("../../Dbconfig/DatabaseConfig");
const { handleSuccess } = require("../../Services/SuccessError");
const { ObjectId } = require("mongodb");

const CadaUpdateController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const id = req?.params?.id;
    const { name, fixedTk, payTk } = req.body;
    const filter = { _id: new ObjectId(id) };
    const dataValue = await Cada.findOne(filter);
    const totalPay = Number(dataValue?.paidTk) + Number(payTk);
    const update = { $set: { name, fixedTk, paidTk: totalPay } };
    const Updated = await Cada.findOneAndUpdate(filter, update);
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
