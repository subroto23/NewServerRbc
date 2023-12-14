const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const CreateJsonWebToken = (model, tokenKey, expired = "10m") => {
  try {
    if (typeof model !== "object" || !model) {
      throw createHttpError(407, "Payload Must be  string or not empty");
    }
    if (typeof tokenKey !== "string" || !tokenKey) {
      throw createHttpError(407, "Token Key Must be a object or not empty");
    }
    const token = jwt.sign(model, tokenKey, { expiresIn: expired });
    if (!token) {
      throw createHttpError(407, "Token not created or Expired");
    }
    return token;
  } catch (error) {
    throw createHttpError(404, "Token not found");
  }
};

module.exports = { CreateJsonWebToken };
