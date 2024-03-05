const { pujaparbon } = require("../../Dbconfig/DatabaseConfig");

const PujaparbonGetController = async (req, res) => {
  try {
    const result = await pujaparbon.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = PujaparbonGetController;
