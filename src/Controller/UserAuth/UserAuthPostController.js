const jwt = require("jsonwebtoken");
const { authUser } = require("../../Dbconfig/DatabaseConfig");
const { authAccessKey } = require("../../secret");
const UserAuthPostController = async (req, res) => {
  try {
    const { email, name, role } = req.body;
    const token = jwt.sign({ email }, authAccessKey, { expiresIn: "24h" });
    const isExist = await authUser.findOne({ email });
    if (isExist) {
      return res.status(200).send(token);
    }
    if (!isExist?.email) {
      const authValue = await authUser.insertOne({ email, name, role });
      return res.status(200).send(token);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = UserAuthPostController;
