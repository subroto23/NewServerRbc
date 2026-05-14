const startClubYearsToCurrentYearsMonthCount = () => {
  // Create a date object for January 2015 (start date)
  const startDate = new Date(2015, 0); // 0 represents January (months are zero-indexed)

  // Get the current date
  const currentDate = new Date();

  // Calculate the total number of months
  const monthsDifference =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    (currentDate.getMonth() - startDate.getMonth());

  return monthsDifference; // Output the number of months
};

module.exports = startClubYearsToCurrentYearsMonthCount;
