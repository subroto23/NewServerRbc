const { ObjectId } = require("mongodb");
const { earnsCollection } = require("../../Dbconfig/DatabaseConfig");
const sendPushNotification = require("../../Controller/Notification/pushNotification");

//Create
const createEarnController = async (req, res, next) => {
  try {
    const data = req?.body;
    const result = await earnsCollection.insertOne(req.body);
    try {
      await sendPushNotification({
        title: `${result?.earnDetails} থেকে ফান্ডে অর্থ সংযুক্ত হলো।`,
        description:`ধন্যবাদ! ${result?.senderName}। আপনার প্রদানকরা ${result?.earnValue} টাকা আমাদের ফান্ডে সংযোগ করা হয়েছে।`,
        deepLink: "rbc://meeting",
      });
    } catch (error) {
      console.log(error);
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
//Get all Earn Values
const getAllEarnController = async (req, res, next) => {
  try {
    const query = req?.query;
    if (query.search !== "") {
      const result = await earnsCollection
        .find({ catagory: query?.search })
        .toArray();
      return res.status(200).send(result.reverse());
    }
    const result = await earnsCollection.find().toArray();
    return res.status(200).send(result.reverse());
  } catch (error) {
    console.log(error);
  }
};

//Get Single Earn Values
const getSingleEarnController = async (req, res, next) => {
  try {
    const { id } = req?.params;
    const result = await earnsCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

//Update Earn Values
const updateEarnController = async (req, res, next) => {
  try {
    const data = req.body;
    const filter = { _id: new ObjectId(data.id) };
    const updatedValues = { $set: req.body };
    const result = await earnsCollection.updateOne(filter, updatedValues, {
      new: true,
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

//Delete Earn Values
const deleteEarnController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await earnsCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
const earnValues = {
  createEarnController,
  getAllEarnController,
  getSingleEarnController,
  updateEarnController,
  deleteEarnController,
};
module.exports = earnValues;
