const { notification } = require("../../Dbconfig/DatabaseConfig");

const notificationPostController = async (req, res) => {
  try {
    const token = req?.body?.token;
    const email = req?.body?.email;
    const isExist = await notification.findOne({ email: req?.body?.email });
    if (isExist) {
      if (isExist.token !== token) {
        const result = await notification.updateOne(
          { email },
          { $set: { token } }
        );
        return res.status(200).send(result);
      }
    }

    if (!isExist && req?.body?.token && req?.body?.email) {
      const result = await notification.insertOne(req?.body);
      res.status(200).send(result);
    }
  } catch (error) {
    console.log("error");
  }
};

module.exports = notificationPostController;
