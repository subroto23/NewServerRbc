const { authUser } = require("../../Dbconfig/DatabaseConfig");

const singleUsergetController = async (req, res) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return res.send("Invalid");
    }
    const result = await authUser.findOne({ email });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = singleUsergetController;
