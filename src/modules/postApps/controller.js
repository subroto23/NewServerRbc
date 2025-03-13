const createHttpError = require("http-errors");
const { postAppsCollection } = require("../../Dbconfig/DatabaseConfig");
const { ObjectId } = require("mongodb");

const appPostCreateController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const { post, image, creatorName, creatorImage } = req.body;
    const dataValues = {
      date: new Date(),
      post,
      image,
      creatorName,
      creatorImage,
      email,
    };
    const appPostValue = await postAppsCollection.insertOne(dataValues);
    return res.status(200).send(appPostValue);
  } catch (error) {
    next(
      createHttpError(
        "দুঃখিত এই মুহুর্তে পোস্টটি পাবলিশ করা সম্ভব হচ্ছে না।আবার চেষ্টা করুন"
      )
    );
  }
};

const appPostAllGetController = async (req, res, next) => {
  try {
    const appPost = await postAppsCollection.find().toArray();
    appPost.reverse();

    if (!appPost) {
      throw createHttpError("এই মুহুর্তে ডাটাবেজে কোনো পোস্ট নেই");
    }
    return res.status(200).send(appPost);
  } catch (error) {
    next(error);
  }
};

const appPostIdBasedController = async (req, res, next) => {
  try {
    const id = req.params.id;
    // newsDetails
    const appPostsDetails = await postAppsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!appPostsDetails) {
      throw createHttpError("পোস্টটি খুজে পাওয়া যায় নি");
    }

    return res.status(200).send(appPostsDetails);
  } catch (error) {
    next(error);
  }
};

const appPostDeleteController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const id = req.params.id;
    const deleteValue = await postAppsCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return res.status(200).send(deleteValue);
  } catch (error) {
    next(error);
  }
};

const appPostUserGetController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    const posts = await postAppsCollection.find({ email }).toArray();
    posts.reverse();
    return res.status(200).send(posts);
  } catch (error) {
    console.log(error);
  }
};

const appPostController = {
  appPostCreateController,
  appPostAllGetController,
  appPostIdBasedController,
  appPostDeleteController,
  appPostUserGetController,
};

module.exports = appPostController;
