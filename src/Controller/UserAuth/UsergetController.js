const { authUser } = require("../../Dbconfig/DatabaseConfig");

const UsergetController = async (req, res) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return res.send("Invalid");
    }
    const result = await authUser.find().toArray();
    res.status(200).send(result.reverse());
  } catch (error) {
    console.log(error);
  }
};
module.exports = UsergetController;
