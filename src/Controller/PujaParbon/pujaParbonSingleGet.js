const { ObjectId } = require("mongodb");
const { pujaparbon } = require("../../Dbconfig/DatabaseConfig");

const pujaParbonSingleGet = async (req, res) => {
  const { id } = req.params;
  const result = await pujaparbon.findOne({ _id: new ObjectId(id) });
  return res.status(200).send(result);
};
module.exports = pujaParbonSingleGet;
