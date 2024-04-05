const createHttpError = require("http-errors");
const { handleSuccess } = require("../../Services/SuccessError");
const { ObjectId } = require("mongodb");
const { NewsModel } = require("../../Dbconfig/DatabaseConfig");

const newsIdBasedController = async (req, res, next) => {
  try {
    const id = req.params.id;
    // newsDetails
    const newsDetails = await NewsModel.findOne({ _id: new ObjectId(id) });
    if (!newsDetails) {
      throw createHttpError("নিউজটি খুজে পাওয়া যায় নি");
    }

    return handleSuccess(res, {
      statusCode: 201,
      message: "নিউজটি সফলভাবে পাওয়া গিয়েছে",
      payload: { newsDetails },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = newsIdBasedController;

// const imageValue = await Jimp.read(newsValue?.image);
//     const font = await Jimp.loadFont(Jimp.FONT_SANS_8_WHITE);
//     const textOptions = {
//       text: "rbcweb.vercel.app",
//       alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
//       alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
//     };
//     const backgroundColor = "#185ADB"; // Red background color (ARGB format)
//     const backgroundWidth = imageValue.getWidth();
//     const backgroundHeight = 30;
//     const background = new Jimp(
//       backgroundWidth,
//       backgroundHeight,
//       backgroundColor
//     );
//     // Calculate the position to print the text at the bottom
//     const textX = 0; // Start text at x-coordinate 0
//     const textY = backgroundHeight / 2 - textOptions.alignmentY; // Center text vertically
//     background.print(
//       font,
//       textX,
//       textY,
//       textOptions,
//       backgroundWidth,
//       backgroundHeight
//     );

//     // Overlay the background onto the original image
//     imageValue.composite(
//       background,
//       0,
//       imageValue.getHeight() - backgroundHeight,
//       {
//         mode: Jimp.BLEND_SOURCE_OVER,
//       }
//     );

//     const buffer = await imageValue.getBufferAsync(Jimp.MIME_JPEG);
//     const base64ImageData = buffer.toString("base64");
//     const mimeType = "image/jpeg"; // Change this according to the image type
//     const dataURI = `data:${mimeType};base64,${base64ImageData}`;
