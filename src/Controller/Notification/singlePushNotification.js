const admin = require("firebase-admin");

const sendSinglePushNotification = async ({
  token,
  title = "রূপসী বাংলা ক্লাব",
  message = "আপনার জীবন হোক সুন্দর ও আলোকিত",
  deepLink = "rbc://home",
  imageLink =
    "https://rbcweb.site/_next/image?url=https%3A%2F%2Fi.ibb.co.com%2F7NvsPsDr%2F105629191-19585706509423sss1-631298054909406055-n.jpg&w=1200&q=75",
}) => {
  try {
    if (!token) {
      return {
        success: false,
        message: "Token is required",
      };
    }

    const payload = {
      token, // 👈 single device token

      notification: {
        title,
        body: message,
        imageUrl: imageLink || undefined,
      },

      data: {
        title: title || "",
        message: message || "",
        deepLink: deepLink || "",
        imageLink: imageLink || "",
      },

      android: {
        priority: "high",
        notification: {
          sound: "default",
          channelId: "default",
          imageUrl: imageLink || undefined,
        },
      },

      apns: {
        payload: {
          aps: {
            sound: "default",
          },
        },
      },

      webpush: {
        notification: {
          icon: imageLink || undefined,
        },
      },
    };

    const response = await admin.messaging().send(payload);

    return {
      success: true,
      response,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = sendSinglePushNotification;