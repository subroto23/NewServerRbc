const createHttpError = require("http-errors");
const userSchemaModel = require("../../Modele/UsersModel/UsersModel");
const { handleSuccess } = require("../../Services/SuccessError");
const bcrypt = require("bcryptjs");
//
const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //
    const loginUser = await userSchemaModel.findOne({ email }).lean();
    if (!loginUser) {
      throw createHttpError("আপনার ই-মেইলটি সঠিক নয়।দয়া করে রেজিস্টেশন করুন");
    }

    const matchPassword = await bcrypt.compare(password, loginUser.password);
    if (!matchPassword) {
      throw createHttpError(
        "দুঃখিত আপনার পাসওয়ার্ড ভুল হয়েছে।আবার চেষ্টা করুন"
      );
    }

    res.cookie("login_cookie", { email, password });

    return handleSuccess(res, {
      statusCode: 200,
      message: "You Loged In successfully",
      payload: { loginUser },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = handleLogin;
