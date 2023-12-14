require("dotenv").config();

const PortNumber = process.env.PORT || process.env.SERVER_PORT_NUMBER;

const mongodbUrl = process.env.MONGODB_ATLAS_URL;

const userDefaultsImages =
  process.env.USER_DEFAULT_IMAGE_PATH || "../public/Images/user.jpg";

const jsonWebTokensKey =
  process.env.JSONWEBTOKE_NEWUSER_REGISTATION || "hfdhfhshisfwiuhfsguihshsh";

const smtpUserName = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;

const clintWebsiteAddress = process.env.CLIENT_WEBSITE_ADDRESS;

const MAX_FILE_SIZE = 2097152;
const ALLOWED_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];

//Auth Key

const authLoginKey = process.env.AUTH_ACCESS_KEY_TOKEN || "fjfjffjjjfjfjf";
module.exports = {
  PortNumber,
  mongodbUrl,
  userDefaultsImages,
  jsonWebTokensKey,
  smtpUserName,
  smtpPassword,
  clintWebsiteAddress,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  authLoginKey,
};
