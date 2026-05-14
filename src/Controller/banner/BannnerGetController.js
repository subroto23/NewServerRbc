const { bannerCollection } = require("../../Dbconfig/DatabaseConfig");

const bannerAllGetController = async (req, res) => {
  try {
    const result = await bannerCollection.find().toArray();
    return res.status(200).send(result.reverse());
  } catch (error) {
    console.log(error);
  }
};
module.exports = bannerAllGetController;
