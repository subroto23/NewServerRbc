const handleError = (
  res,
  { statusCode = 200, message = "Failed!Backend Data errors" },
) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

const handleSuccess = (
  res,
  { statusCode = 200, message = "SuccessFully Data Found", payload = {} },
) => {
  res.status(statusCode).json({
    success: true,
    message,
    payload,
  });
};

module.exports = { handleError, handleSuccess };
