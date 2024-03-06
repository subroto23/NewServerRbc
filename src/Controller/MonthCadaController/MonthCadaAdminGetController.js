const { monthcada } = require("../../Dbconfig/DatabaseConfig");
const previousMonthGenerator = require("../../utlis/PreviousMonthGenerator");
const calculateTotalMonths = require("../../utlis/calculateTotalMonths");
const MonthCadaAdminGetController = async (req, res) => {
  try {
    // const email = req?.decoded?.email;
    // if (!email) {
    //   return;
    // }
    const totalMonths = calculateTotalMonths("data");
    const result = await monthcada
      .aggregate([
        {
          $project: {
            name: 1,
            email: 1,
            monthCount: {
              $abs: { $subtract: [{ $size: "$month" }, totalMonths] },
            },
          },
        },
      ])
      .toArray();

    // Previous month Values Getiing
    const updatedResult = previousMonthGenerator(result);
    //Client Response Send
    res.status(200).send(updatedResult);
  } catch (error) {
    console.log(error);
  }
};
module.exports = MonthCadaAdminGetController;
