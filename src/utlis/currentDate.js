const currentDate = () => {
  const now = new Date(Date.now()); // Create a Date object

  const year = now.getFullYear(); // Get the year
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed) and pad it to 2 digits
  const day = String(now.getDate()).padStart(2, "0"); // Get the day and pad it to 2 digits

  const formattedDate = `${year}-${month}-${day}`; // Format as YYYY-MM-DD

  return formattedDate;
};

module.exports = currentDate;
