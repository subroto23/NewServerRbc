const moment = require("moment");

const previousMonthGenerator = (data) => {
  const updatedValues = data?.map((item) => {
    moment.locale("bn-en");
    const currMonthName = moment().format("MMMM YYYY");
    const prevMonthName = moment()
      .subtract(item.monthCount - 1, "month")
      .startOf("month")
      .format("MMMM YYYY");

    return {
      ...item,
      prevMonthName: prevMonthName,
      currMonthName,
    };
  });
  return updatedValues;
};
module.exports = previousMonthGenerator;
