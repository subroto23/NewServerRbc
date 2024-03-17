const { notification } = require("../../Dbconfig/DatabaseConfig");

const notificationPostController = async (req, res) => {
  try {
    const isExist = await notification.findOne({ email: req?.body?.email });
    if (!isExist && req?.body?.token && req?.body?.email) {
      const result = await notification.insertOne(req?.body);
      res.status(200).send(result);
    }
  } catch (error) {
    console.log("error");
  }
};

module.exports = notificationPostController;
