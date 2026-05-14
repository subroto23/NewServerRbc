const createHttpError = require("http-errors");

const {
  googleMeetLink,
} = require("../../Dbconfig/DatabaseConfig");


// ======================================================
// CREATE OR UPDATE GOOGLE MEET
// ======================================================

const googleMeetCreateUpdateController = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      meetLink,
      password,
      meetingTime,
      meetingDate,
    } = req.body;

    // ============================================
    // VALIDATION
    // ============================================

    if (
      !title ||
      !meetLink ||
      !meetingTime ||
      !meetingDate
    ) {
      throw createHttpError(
        400,
        "Title, Meet Link, Meeting Time and Date are required"
      );
    }

    // ============================================
    // DATA OBJECT
    // ============================================

    const dataValues = {
      title,
      meetLink,
      password: password || "",
      meetingTime,
      meetingDate,
      updatedAt: new Date(),
    };

    // ============================================
    // UPSERT (ONLY ONE DOCUMENT)
    // ============================================

    const result =
      await googleMeetLink.findOneAndUpdate(
        {}, // always update single document
        {
          $set: dataValues,

          $setOnInsert: {
            createdAt: new Date(),
          },
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

    // ============================================
    // PUSH NOTIFICATION
    // ============================================

    try {
      await sendPushNotification({
        title:title ||  `নতুন মিটিং আপডেট`,
        description:
          "মিটিং দেখতে অ্যাপ ওপেন করুন",
        deepLink: "rbc://meeting",
      });
    } catch (error) {
      console.log(
        "Push Notification Error:",
        error
      );
    }

    // ============================================
    // RESPONSE
    // ============================================

    return res.status(200).json({
      success: true,
      message:
        "Google Meet information updated successfully",

      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET GOOGLE MEET
// ======================================================

const googleMeetGetController = async (
  req,
  res,
  next
) => {
  try {
    const meeting =
      await googleMeetLink.findOne({});

    if (!meeting) {
      throw createHttpError(
        404,
        "কোনো মিটিং পাওয়া যায় নি"
      );
    }

    return res.status(200).json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// DELETE GOOGLE MEET
// ======================================================

const googleMeetController = {
  googleMeetCreateUpdateController,
  googleMeetGetController,
};

module.exports = googleMeetController;