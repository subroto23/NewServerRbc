const admin = require("firebase-admin");

const sendChatNotification = async ({
  title = "ক্লাব অ্যাপে ম্যাসেজ করেছেন",
  message = "ক্লাবের অ্যাপ চালু করে এসএমএস টি দেখুন",
  room = "group_chat",
  senderId = "",
  senderName = "",
  deepLink = "rbc://meeting",
  imageLink = "https://rbcweb.site/_next/image?url=https%3A%2F%2Fi.ibb.co.com%2F7NvsPsDr%2F105629191-19585706509423sss1-631298054909406055-n.jpg&w=1200&q=75",
}) => {
  try {
    const payload = {
      topic: room,

      notification: {
        title: `${senderName} তোমাকে এসএমএস করেছে` || title || "Chat",
        body: message,
      },

      data: {
        type: "chat",
        room,
        senderId,
        senderName,
        deepLink,
        imageUrl: imageLink || undefined,
      },

      android: {
        priority: "high",
        notification: {
          sound: "default",
          channelId: "default",
          icon: "https://i.postimg.cc/02PhhR1Z/Notification-App-Logo-(96-x-96-px)-(72-x-72-px).png", // 72x72 আইকন
          imageUrl:
            "https://i.postimg.cc/PJz9NKYQ/Notification-App-Logo-(96-x-96-px).png" || imageLink ,
        },
      },

      webpush: {
        notification: {
          icon: "https://i.postimg.cc/PJz9NKYQ/Notification-App-Logo-(96-x-96-px).png", // 96x96 আইকন
          badge:
            "https://i.postimg.cc/PqgR40MQ/Notification-App-Logo-(96-x-96-px)-(72-x-72-px)-(48-x-48-px).png", // 48x48 ব্যাজ
          image:
            imageLink ||
            "https://i.postimg.cc/PJz9NKYQ/Notification-App-Logo-(96-x-96-px).png",
        },
        headers: {
          image:
            imageLink ||
            "https://i.postimg.cc/PJz9NKYQ/Notification-App-Logo-(96-x-96-px).png",
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

module.exports = sendChatNotification;
