const createHttpError = require("http-errors");
const { authLoginKey } = require("../secret");
const jwt = require("jsonwebtoken");
const isLogedIn = (req, res, next) => {
  try {
    const token = req.cookies.access_login_token;
    if (!token) {
      throw createHttpError("Please Logged in First");
    }
    const decoded = jwt.verify(token, authLoginKey);
    req.body = decoded;
    return next();
  } catch (error) {
    next(error);
  }
};
module.exports = isLogedIn;
