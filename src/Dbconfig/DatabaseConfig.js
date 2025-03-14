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
const authUser = client.db("rbcDatabase").collection("auth");
const monthcada = client.db("rbcDatabase").collection("monthcada");
const pujaparbon = client.db("rbcDatabase").collection("pujaparbon");
const notification = client.db("rbcDatabase").collection("notification");
const bannerCollection = client.db("rbcDatabase").collection("banner");
const earnsCollection = client.db("rbcDatabase").collection("earns");
const spendCollection = client.db("rbcDatabase").collection("spend");
const topAppsBannerCollection = client
  .db("rbcDatabase")
  .collection("topbanner");
const bottomAppsBannerCollection = client
  .db("rbcDatabase")
  .collection("bottombanner");
const postAppsCollection = client.db("rbcDatabase").collection("appsPost");

//Export MongoDb Collections
module.exports = {
  userSchemaModel,
  monthcada,
  Cada,
  DueModel,
  EventsModel,
  NewsModel,
  titleModel,
  authUser,
  pujaparbon,
  notification,
  bannerCollection,
  earnsCollection,
  spendCollection,
  topAppsBannerCollection,
  bottomAppsBannerCollection,
  postAppsCollection,
  mongodbConnection,
};
