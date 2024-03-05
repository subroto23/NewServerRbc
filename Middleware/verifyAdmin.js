const { authUser } = require("../src/Dbconfig/DatabaseConfig");

const verifyAdmin = async (req, res, next) => {
  try {
    const email = req?.decoded?.email;
    if (!email) {
      return;
    }
    const { role } = await authUser.findOne({ email });
    if (role === "admin") {
      return next();
    } else {
      return res.status(400).send("Unothorized admin");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = verifyAdmin;
