const { MongoClient, ServerApiVersion } = require("mongodb");
const { mongodbUrl } = require("../secret");

//Mongodb Client
const client = new MongoClient(mongodbUrl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//
const mongodbConnection = async () => {
  try {
    // await client.connect();
    console.log("Mongodb Connected Successfully");
  } catch (error) {
    console.log("Mongodb Not Connected");
  }
};
const userSchemaModel = client.db("rbcDatabase").collection("users");
const Cada = client.db("rbcDatabase").collection("cadas");
const DueModel = client.db("rbcDatabase").collection("dues");
const EventsModel = client.db("rbcDatabase").collection("events");
const NewsModel = client.db("rbcDatabase").collection("news");
const titleModel = client.db("rbcDatabase").collection("titles");

//Export MongoDb Collections
module.exports = {
  userSchemaModel,
  Cada,
  DueModel,
  EventsModel,
  NewsModel,
  titleModel,
  mongodbConnection,
};
