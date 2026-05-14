const { ObjectId } = require("mongodb");
const { EventsModel } = require("../../Dbconfig/DatabaseConfig");

const eventsDeleteController = async (req, res) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const id = req?.params?.id;
    const result = await EventsModel.deleteOne({ _id: new ObjectId(id) });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = eventsDeleteController;
