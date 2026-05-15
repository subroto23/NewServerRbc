const { Cada } = require("../../Dbconfig/DatabaseConfig");
const { handleSuccess } = require("../../Services/SuccessError");
const sendPushNotification = require("../Notification/pushNotification");

const cadaPostController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const { name, fixedTk, paidTk } = req.body;
    const bodyDatas = {
      name,
      fixedTk,
      paidTk,
    };
    const postData = await Cada.insertOne(bodyDatas);
    
    //send notification
    try {
      await sendPushNotification({
        title: `${name} পূজার প্রণামী প্রদান করেছেন`,
        description: `${paidTk} টাকা প্রদান করেছেন। পূজা কমিটির পক্ষ থেকে ধন্যবাদ`,
        deepLink: "rbc://meeting",
      });
    } catch (error) {
      console.log(error);
    }
    return handleSuccess(res, {
      statusCode: 200,
      message: "আবেদনটি সফল হয়েছে",
      payload: {},
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
module.exports = cadaPostController;
