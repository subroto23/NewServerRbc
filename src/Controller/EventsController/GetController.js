const { EventsModel } = require("../../Dbconfig/DatabaseConfig");
const { handleSuccess } = require("../../Services/SuccessError");

const getEventController = async (req, res, next) => {
  const event = await EventsModel.find().toArray();
  return handleSuccess(res, {
    success: true,
    message: "সফলভাবে সংযোজন করা হয়েছে",
    payload: { event },
  });
};
module.exports = { getEventController };
