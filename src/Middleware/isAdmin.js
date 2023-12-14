const createHttpError = require("http-errors");
const isAdmin = (req, res, next) => {
  try {
    const admin = req.body.userInfo.isAdmin;
    if (!admin) {
      throw createHttpError(
        "Forbidden. You are not allowed to access this page"
      );
    }
    return next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAdmin;
