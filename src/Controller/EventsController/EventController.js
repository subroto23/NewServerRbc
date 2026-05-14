const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const { EventsModel } = require("../../Dbconfig/DatabaseConfig");

const eventsPostController = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const { title, subtitle, date } = req.body;
    const eventDataPass = {
      email,
      title,
      subtitle,
      date,
    };
    const eventsSaveValue = await EventsModel.insertOne(eventDataPass);
    if (!eventsSaveValue) {
      throw createHttpError(
        "এই মুহুর্তে সংযোজন করা যাচ্ছে না।আবার চেষ্টা করুন",
      );
    }

    return handleSuccess(res, {
      success: true,
      message: "সফলভাবে সংযোজন করা হয়েছে",
      payload: { eventsSaveValue },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { eventsPostController };
