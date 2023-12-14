const { handleSuccess } = require("../../Services/SuccessError");

const handleLogOut = (req, res, next) => {
  res.clearCookie("access_login_token");
  return handleSuccess(res, {
    statusCode: 200,
    message: "LogOut Successfully",
  });
};
module.exports = handleLogOut;
