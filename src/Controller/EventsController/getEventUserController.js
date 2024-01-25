const { EventsModel } = require("../../Dbconfig/DatabaseConfig");

const getEventUserController = async (req, res) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const result = await EventsModel.find({ email }).toArray();
    res.status(200).send(result.reverse());
  } catch (error) {
    console.log(error);
  }
};
module.exports = getEventUserController;
