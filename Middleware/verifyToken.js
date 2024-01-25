const jwt = require("jsonwebtoken");
const { authAccessKey } = require("../src/secret");

const VerifyToken = (req, res, next) => {
  if (!req?.headers?.authorization) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = req?.headers?.authorization.split(" ")[1];
  jwt.verify(token, authAccessKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = VerifyToken;
