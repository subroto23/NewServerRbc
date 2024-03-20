const { bannerCollection } = require("../../Dbconfig/DatabaseConfig");

const bannerPostController = async (req, res) => {
  try {
    const result = await bannerCollection.insertOne(req.body);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = bannerPostController;
