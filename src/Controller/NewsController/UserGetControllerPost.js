const { NewsModel } = require("../../Dbconfig/DatabaseConfig");

const UserGetControllerPost = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    const posts = await NewsModel.find({ email }).toArray();
    posts.reverse();
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
  }
};
module.exports = UserGetControllerPost;
