const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const { EventsModel } = require("../../Dbconfig/DatabaseConfig");

const getEventController = async (req, res, next) => {
  try {
    const event = await EventsModel.find().toArray();
    if (!event) {
      createHttpError("এই মুহুর্তে কোনো উৎসবের নাম খুজে পাওয়া যাচ্ছে না।");
    }
    return handleSuccess(res, {
      statusCode: 201,
      message: "আপনার অনুরোধ সফল হয়েছে",
      payload: { event },
    });
  } catch (error) {}
};
module.exports = { getEventController };
