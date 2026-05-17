const { notification, monthcada } = require("../../Dbconfig/DatabaseConfig");
const MonthCadaAdminGetController = require("../MonthCadaController/MonthCadaAdminGetController");
const sendSinglePushNotification = require("./singlePushNotification");

const sendMonthDueMessage = async (req, res) => {
  try {
    const rawReq = {
      query: {},
    };
    const data = await new Promise((resolve, reject) => {
      const fakeRes = {
        status: () => ({
          send: (result) => resolve(result),
        }),
      };

      MonthCadaAdminGetController(rawReq, fakeRes).catch(reject);
    });

    const users = await notification.find({}).toArray();

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No notification users found",
      });
    }

    const results = [];
    for (const user of users) {
      const email = user.email;
      const token = user.token;
      const name = user.name || "প্রিয় সদস্য";

      if (!token || !email) continue;

      const match = data.find((d) => d.email === email);

      if (!match) continue;

      let message = "";
      let title = "";
      if (match.monthCount > 0) {
        title = `প্রিয় ${name}, আপনার ${match?.monthCount} মাসের মাসিক চাঁদা বকেয়া রয়েছে।`;

        message = `রূপসী বাংলা ক্লাবের কার্যক্রম সুন্দরভাবে চালিয়ে নিতে আপনার সহযোগিতা অত্যন্ত গুরুত্বপূর্ণ। দয়া করে দ্রুত ${match?.monthCount * 50} টাকা পরিশোধ করার অনুরোধ রইলো`;
      } else {
        title = "${name} আপনাকে অভিনন্দন!";
        message = `আপনি নিয়মিতভাবে আপনার মাসিক চাঁদা পরিশোধ করে ক্লাবের প্রতি যে দায়িত্ববোধ ও ভালোবাসা দেখিয়েছেন, তার জন্য রূপসী বাংলা ক্লাব আন্তরিক কৃতজ্ঞতা প্রকাশ করছে। আপনার এই অবদান আমাদের পথচলাকে আরও সুন্দর ও শক্তিশালী করে`;
      }

      try {
        const result = await sendSinglePushNotification({
          token,
          title,
          message,
          room: "month_due",
          senderId: "system",
          senderName: "Rupashi Bangla Club",
          deepLink: "",
          imageLink:
            "https://rbcweb.site/_next/image?url=https%3A%2F%2Fi.ibb.co.com%2F7NvsPsDr%2F105629191-19585706509423sss1-631298054909406055-n.jpg&w=1200&q=75",
        });

        results.push({
          email,
          name,
          success: true,
          monthCount: match.monthCount,
          type: match.monthCount > 0 ? "due" : "no-due",
        });
      } catch (err) {
        results.push({
          email,
          name,
          success: false,
          error: err.message,
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;

    return res.status(200).json({
      success: true,
      message: "Month due notifications processed successfully",
      total: users.length,
      successCount,
      results,
    });
  } catch (error) {
    console.error("sendMonthDueMessage error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = sendMonthDueMessage;