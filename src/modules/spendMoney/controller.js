const { ObjectId } = require("mongodb");
const { spendCollection } = require("../../Dbconfig/DatabaseConfig");

//Create
const createSpendController = async (req, res, next) => {
  try {
    const data = req?.body;
    const result = await spendCollection.insertOne(req.body);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
//Get all Spend Values
const getAllSpendController = async (req, res, next) => {
  try {
    const result = await spendCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

//Get Single Spend Values
const getSingleSpendController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await spendCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

//Update Spend Values
const updateSpendController = async (req, res, next) => {
  try {
    const data = req.body;
    const filter = { _id: new ObjectId(data.id) };
    const updatedValues = { $set: req.body };
    const result = await spendCollection.updateOne(filter, updatedValues, {
      new: true,
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

//Delete Spend Values
const deleteSpendController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await spendCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
const SpendValues = {
  createSpendController,
  getAllSpendController,
  getSingleSpendController,
  updateSpendController,
  deleteSpendController,
};
module.exports = SpendValues;
