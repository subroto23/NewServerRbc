const { monthcada } = require("../../Dbconfig/DatabaseConfig");

const MonthCadaGetController = async (req, res) => {
  try {
    const emailValue = req?.decoded?.email;
    if (!emailValue) {
      return;
    }
    const result = await monthcada.findOne({ email: emailValue });
    const { month, name, email } = result;
    const originalArray = month.map((data, idx) =>
      data === 1 ? (idx < 60 ? 100 : 50) : 0,
    );
    const subMonth = [];
    for (let i = 0; i <= originalArray.length; i = i + 12) {
      subMonth.push(originalArray.slice(i, i + 12));
    }
    const resultValue = {
      name,
      email,
      payment: subMonth.reverse(),
    };
    return res.status(200).send(resultValue);
  } catch (error) {
    console.log(error);
  }
};
module.exports = MonthCadaGetController;
