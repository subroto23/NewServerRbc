const { ObjectId } = require("mongodb");
const { authUser } = require("../../Dbconfig/DatabaseConfig");

const UsergetIdController = async (req, res) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return res.send("Invalid");
    }
    const id = req?.params?.id;
    const result = await authUser.find({ _id: new ObjectId(id) });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = UsergetIdController;
