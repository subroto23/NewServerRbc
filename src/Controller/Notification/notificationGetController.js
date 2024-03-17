const { notification } = require("../../Dbconfig/DatabaseConfig");

const notificationGetController = async (req, res) => {
  try {
    const result = await notification
      .aggregate([
        {
          $group: { _id: null, tokens: { $push: "$token" } },
        },
        {
          $project: { tokens: 1, _id: 0 },
        },
      ])
      .toArray();
    return res.status(200).send(result[0]);
    
  } catch (error) {
    console.log(error);
  }
};
module.exports = notificationGetController;
