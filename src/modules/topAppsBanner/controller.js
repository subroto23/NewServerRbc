const { topAppsBannerCollection } = require("../../Dbconfig/DatabaseConfig");

const topAppsBannerPostController = async (req, res) => {
  try {
    const result = await topAppsBannerCollection.insertOne(req.body);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const topAppsBannerAllGetController = async (req, res) => {
  try {
    const result = await topAppsBannerCollection.find().toArray();
    return res.status(200).send(result.reverse());
  } catch (error) {
    console.log(error);
  }
};

const topAppsBannerDeleteController = async (req, res) => {
  try {
    const id = req.params?.id;
    const filter = { _id: new ObjectId(id) };
    const result = await topAppsBannerCollection.deleteOne(filter);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const topBannerController = {
  topAppsBannerPostController,
  topAppsBannerAllGetController,
  topAppsBannerDeleteController,
};
module.exports = topBannerController;
