const createHttpError = require("http-errors");
const isBanned = (req, res, next) => {
  try {
    const admin = req.body.userInfo.isBanned;
    if (admin) {
      throw createHttpError(
        "You are not allowed to access this page.Please contact authority"
      );
    }
    return next();
  } catch (error) {
    next(error);
  }
};
module.exports = isBanned;
