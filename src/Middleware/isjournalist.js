const createHttpError = require("http-errors");
const isjournalist = (req, res, next) => {
  try {
    const admin = req.body.userInfo.isjournalist;
    if (!admin) {
      throw createHttpError("Sorry.You are not Journalist");
    }
    return next();
  } catch (error) {
    next(error);
  }
};
module.exports = isjournalist;
