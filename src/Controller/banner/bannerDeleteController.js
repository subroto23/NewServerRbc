const { ObjectId } = require("mongodb");
const { bannerCollection } = require("../../Dbconfig/DatabaseConfig");

const bannerDeleteController = async (req, res) => {
  try {
    const id = req.params?.id;
    const filter = { _id: new ObjectId(id) };
    const result = await bannerCollection.deleteOne(filter);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = bannerDeleteController;
