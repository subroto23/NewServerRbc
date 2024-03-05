const calculateTotalMonths = () => {
  const startDate = new Date("2015-01-01");
  const currentDate = new Date();
  const startYear = startDate.getFullYear();
  const currentYear = currentDate.getFullYear();
  const startMonth = startDate.getMonth();
  const currentMonth = currentDate.getMonth();
  const totalMonths =
    (currentYear - startYear) * 12 + (currentMonth - startMonth) + 1;
  return totalMonths;
};
module.exports = calculateTotalMonths;
