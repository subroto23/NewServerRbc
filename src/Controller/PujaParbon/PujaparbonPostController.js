const { pujaparbon } = require("../../Dbconfig/DatabaseConfig");

const PujaparbonPostController = async (req, res) => {
  try {
    const result = await pujaparbon.insertOne(req?.body);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = PujaparbonPostController;
