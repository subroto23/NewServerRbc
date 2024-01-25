const { ObjectId } = require("mongodb");
const { authUser } = require("../../Dbconfig/DatabaseConfig");

const UserPatchController = async (req, res) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return res.send("Invalid");
    }
    const id = req?.params.id;
    const { role } = req?.body;
    const update = { $set: { role } };
    const filter = { _id: new ObjectId(id) };
    const result = await authUser.updateOne(filter, update);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = UserPatchController;
