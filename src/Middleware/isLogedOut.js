const createHttpError = require("http-errors");
const isLogedOut = (req, res, next) => {
  try {
    const token = req.cookies.access_login_token;
    if (token) {
      throw createHttpError("You already logged in");
    }
    return next();
  } catch (error) {
    next(error);
  }
};
module.exports = isLogedOut;
