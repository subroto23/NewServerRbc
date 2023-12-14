const createHttpError = require("http-errors");
const userSchemaModel = require("../../Modele/UsersModel/UsersModel");
const { handleSuccess } = require("../../Services/SuccessError");

const searchingUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const pages = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
      ],
    };

    const options = { password: 0 };

    const user = await userSchemaModel
      .find(filter, options)
      .limit(limit)
      .skip((pages - 1) * limit);

    const count = await userSchemaModel.find(filter, options).countDocuments();

    if (!user) {
      throw createHttpError(404, "Sorry! User Not Found");
    }

    return handleSuccess(res, {
      status: 201,
      message: "Find User Successfully",
      payload: {
        user,
        pagenation: {
          totalPages: Math.ceil(count / limit),
          currentPage: pages,
          previousPage: pages - 1 > 0 ? pages - 1 : null,
          nextPage: pages + 1 <= Math.ceil(count / limit) ? pages + 1 : null,
        },
      },
    });
  } catch (error) {
    next(createHttpError(502, "Could not find user,Something went wrong"));
  }
};

module.exports = searchingUsers;
