const { bottomAppsBannerCollection } = require("../../Dbconfig/DatabaseConfig");
const { ObjectId } = require("mongodb");

const bottomAppsBannerPostController = async (req, res) => {
  try {
    const result = await bottomAppsBannerCollection.insertOne(req.body);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const bottomAppsBannerAllGetController = async (req, res) => {
  try {
    const result = await bottomAppsBannerCollection.find().toArray();
    return res.status(200).send(result.reverse());
  } catch (error) {
    console.log(error);
  }
};

const bottomAppsBannerDeleteController = async (req, res) => {
  try {
    const id = req.params?.id;
    const filter = { _id: new ObjectId(id) };
    const result = await bottomAppsBannerCollection.deleteOne(filter);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const bottomBannerController = {
  bottomAppsBannerPostController,
  bottomAppsBannerAllGetController,
  bottomAppsBannerDeleteController,
};
module.exports = bottomBannerController;
