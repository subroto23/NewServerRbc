const {
  notification,
  EventsModel,
} = require("../../Dbconfig/DatabaseConfig");

const sendSinglePushNotification = require("./singlePushNotification");


const banglaWeekDays = {
  Sunday: "রবিবার",
  Monday: "সোমবার",
  Tuesday: "মঙ্গলবার",
  Wednesday: "বুধবার",
  Thursday: "বৃহস্পতিবার",
  Friday: "শুক্রবার",
  Saturday: "শনিবার",
};

const deleteOldEvents = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayString = today.toISOString().split("T")[0];

    const deleteResult = await EventsModel.deleteMany({
      date: {
        $lt: todayString,
      },
    });

    console.log(
      `${deleteResult.deletedCount} old events deleted`
    );

    return deleteResult.deletedCount;
  } catch (error) {
    console.log("Delete old events error:", error);
    return 0;
  }
};


const formatBanglaDate = (date) => {
  return new Date(date).toLocaleDateString(
    "bn-BD",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
};

const sendEventNotification = async ({
  event,
  type = "today",
  users = [],
}) => {
  try {
    if (!event) return;

    const today = new Date();

    const englishDay = today.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );

    const banglaDay =
      banglaWeekDays[englishDay] || "আজ";

    let title = "";
    let message = "";

    if (type === "today") {
      title = `আজ ${banglaDay} • ${event.title}`;

      message = `আজ ${event.title} ${event.subtitle || ""} আপনার দিনটি হোক শুভ, মঙ্গলময় ও আনন্দে ভরা`;}

    if (type === "tomorrow") {
      title = `আগামীকাল ${event.title}`;

      message = `এই বিশেষ দিনের
প্রতিটি মুহূর্ত হয়ে উঠুক অর্থপূর্ণ, সুন্দর ও অনুভূতিতে ভরা।
মানুষের মাঝে সম্পর্ক, ভালোবাসা ও সম্প্রীতির বন্ধন আরও গভীর হোক`;
    }

    const results = [];

    for (const user of users) {
      try {
        if (!user?.token) continue; 
        const response =
          await sendSinglePushNotification({
            token: user.token,

            title : `${user.name}, ${title}`,

            message,

            deepLink: "",

            imageLink:
              "https://rbcweb.site/_next/image?url=https%3A%2F%2Fi.ibb.co.com%2F7NvsPsDr%2F105629191-19585706509423sss1-631298054909406055-n.jpg&w=1200&q=75",
          });

        results.push({
          name: user.name,
          success: response.success,
        });

        // small delay
        await new Promise((resolve) =>
          setTimeout(resolve, 500)
        );
      } catch (error) {
        results.push({
          name: user.name,
          success: false,
          error: error.message,
        });
      }
    }

    return results;
  } catch (error) {
    console.log(
      "sendEventNotification error:",
      error
    );
  }
};

// ======================================================
// MAIN FUNCTION
// ======================================================

const sendDailyEventNotifications =
  async (req, res, next) => {
    try {
      await deleteOldEvents();
      const users = await notification
        .find({})
        .toArray();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayString = today
        .toISOString()
        .split("T")[0];
      const tomorrow = new Date(today);
      tomorrow.setDate(
        tomorrow.getDate() + 1
      );
      const tomorrowString = tomorrow
        .toISOString()
        .split("T")[0];
      const todayEvents =
        await EventsModel.find({
          date: todayString,
        }).toArray();
      const tomorrowEvents =
        await EventsModel.find({
          date: tomorrowString,
        }).toArray();
      const todayResults = [];

      for (const event of todayEvents) {
        const result =
          await sendEventNotification({
            event,
            type: "today",
            users,
          });

        todayResults.push({
          event: event.title,
          results: result,
        });
      }

      const tomorrowResults = [];

      for (const event of tomorrowEvents) {
        const result =
          await sendEventNotification({
            event,
            type: "tomorrow",
            users,
          });

        tomorrowResults.push({
          event: event.title,
          results: result,
        });
      }
      return res.status(200).json({
        success: true,

        message:
          "Event notifications completed",

        todayDate: formatBanglaDate(
          todayString
        ),

        tomorrowDate:
          formatBanglaDate(
            tomorrowString
          ),

        todayEventsCount:
          todayEvents.length,

        tomorrowEventsCount:
          tomorrowEvents.length,

        todayEvents,

        tomorrowEvents,

        todayResults,

        tomorrowResults,
      });
    } catch (error) {
      console.log(
        "sendDailyEventNotifications error:",
        error
      );

      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };


module.exports = sendDailyEventNotifications;