const { ObjectId } = require("mongodb");
const { Cada } = require("../../Dbconfig/DatabaseConfig");

const cadaDeleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteValue = await Cada.findOneAndDelete({ _id: new ObjectId(id) });
    return handleSuccess(res, {
      statusCode: 200,
      message: "সফলভাবে তথ্যটি ডিলেট করা হয়েছে",
      payload:  deleteValue ,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = cadaDeleteById;
