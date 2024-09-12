const { monthcada, authUser } = require("../../Dbconfig/DatabaseConfig");
const CalculateMonthAfterPaidClubCada = require("../../utlis/CalculateMonthAfterPaidClubCada");

const MonthCadaPostController = async (req, res) => {
  try {
    const emailData = req?.decoded?.email;
    if (!emailData) {
      return;
    }

    let payMonth;
    const { pay, discount, email, perValue } = req.body;
    const { name } = await authUser.findOne({ email });
    const monthValue = [0, 0, 0, 0, 0];
    if (pay > 0) {
      payMonth = [...Array(Number(pay)).keys()].map(() => 1);
      await CalculateMonthAfterPaidClubCada(pay, perValue, email);
    } else if (discount > 0) {
      payMonth = [...Array(Number(discount)).keys()].map(() => 0);
    }
    const isExist = await monthcada.findOne({ email });
    if (!isExist) {
      await monthcada.insertOne({ email, name, month: monthValue });
    }
    const isExistValue = await monthcada.findOne({ email });
    if (isExistValue) {
      const { email, month } = isExistValue;
      const newPay = [...month, ...payMonth];
      const query = { $set: { month: newPay } };
      const options = { upsert: true };
      const result = await monthcada.updateOne({ email }, query, options);
      res.status(200).send(result);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = MonthCadaPostController;
