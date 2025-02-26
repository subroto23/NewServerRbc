const jwt = require("jsonwebtoken");
const { authUser } = require("../../Dbconfig/DatabaseConfig");
const { authAccessKey } = require("../../secret");
const UserAuthPostController = async (req, res) => {
  try {
    const { email, name, role } = req.body;
    const isExist = await authUser.findOne({ email });
    if (isExist) {
      const jwtTokenValue = {
        email: isExist?.email,
        name: isExist?.name,
        role: isExist?.role,
      };
      const token = jwt.sign(jwtTokenValue, authAccessKey, {
        expiresIn: "24h",
      });
      return res.status(200).send(token);
    }
    if (!isExist?.email) {
      await authUser.insertOne({ email, name, role });
      const jwtTokenData = {
        email,
        name,
        role,
      };
      const token = jwt.sign(jwtTokenData, authAccessKey, { expiresIn: "24h" });
      return res.status(200).send(token);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = UserAuthPostController;
