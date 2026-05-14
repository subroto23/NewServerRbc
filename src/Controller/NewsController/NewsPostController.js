const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const { NewsModel } = require("../../Dbconfig/DatabaseConfig");
const sendPushNotification = require("../Notification/pushNotification");

const newsPostController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const { title, details, image, createdBy, metaImage } = req.body;
    const dataValues = {
      date: new Date(),
      title,
      details,
      createdBy,
      email,
      image,
      metaImage,
    };
    const publishNews = await NewsModel.insertOne(dataValues);

    //send notification
    try {
      await sendPushNotification({
        title: title ||  `রূপসী বাংলা ক্লাবের ওয়েবসাইটে ${createdBy} পোস্ট করেছেন`,
        description: details || `পোস্টটি দেখতে ওয়েবসাইট ভিজিট করুন`,
        deepLink: `https://rbcweb.site/post/view/${publishNews?.id}` || "",
        imageLink: image || metaImage || "",
      });
    } catch (error) {
      console.log(error);
    }

    return handleSuccess(res, {
      statusCode: 200,
      message: "নিউজটি সফলভাবে পাবলিশ করা হয়েছে",
      payload: { publishNews },
    });
  } catch (error) {
    next(
      createHttpError(
        "দুঃখিত এই মুহুর্তে নিউজটি পাবলিশ করা সম্ভব হচ্ছে না।আবার চেষ্টা করুন",
      ),
    );
  }
};

module.exports = newsPostController;
