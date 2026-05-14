const admin = require("firebase-admin");

const {
  notification,
} = require("../../Dbconfig/DatabaseConfig");

// ===========================================
// FIREBASE ADMIN CONFIG
// ===========================================

const serviceAccount = require("../../../firebase-adminsdk.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// ===========================================
// MAIN FUNCTION
// ===========================================

const sendPushNotification = async ({
  title = "Rupashi Bangla Club",
  description = "New Notification",
  deepLink = "https://rbcweb.site",
  imageLink = "https://rbcweb.site/_next/image?url=https%3A%2F%2Fi.ibb.co.com%2F7NvsPsDr%2F105629191-19585706509423sss1-631298054909406055-n.jpg&w=1200&q=75",
}) => {
  try {
    // ===========================================
    // GET ALL TOKENS
    // ===========================================

    const users = await notification.find({}).toArray();

    if (!users.length) {
      console.log("No notification tokens found");

      return {
        success: false,
        message: "No users found",
      };
    }

    // ===========================================
    // FILTER TOKENS
    // ===========================================

    const tokens = users
      .map((user) => user.token)
      .filter(Boolean);

    if (!tokens.length) {
      console.log("No valid tokens available");

      return {
        success: false,
        message: "No valid tokens found",
      };
    }

    // ===========================================
    // FIREBASE MESSAGE
    // ===========================================

    const message = {
      tokens,

      notification: {
        title,
        body: description,
        imageUrl: imageLink || undefined,
      },

      data: {
        title: title || "",
        description: description || "",
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

    // ===========================================
    // SEND NOTIFICATION
    // ===========================================

    const response = await admin
      .messaging()
      .sendEachForMulticast(message);

    console.log(
      `Success: ${response.successCount}`
    );

    console.log(
      `Failed: ${response.failureCount}`
    );

    // ===========================================
    // HANDLE INVALID TOKENS
    // ===========================================

    const invalidTokens = [];

    response.responses.forEach((resp, index) => {
      if (!resp.success) {
        const errorCode = resp.error?.code;

        console.log(
          `Token Error: ${tokens[index]}`,
          errorCode
        );

        // Expired / Invalid Token
        if (
          errorCode ===
            "messaging/registration-token-not-registered" ||
          errorCode ===
            "messaging/invalid-registration-token"
        ) {
          invalidTokens.push(tokens[index]);
        }
      }
    });

    // ===========================================
    // DELETE INVALID TOKENS
    // ===========================================

    if (invalidTokens.length > 0) {
      await notification.deleteMany({
        token: {
          $in: invalidTokens,
        },
      });

      console.log(
        `${invalidTokens.length} invalid tokens removed`
      );
    }

    // ===========================================
    // FINAL RESPONSE
    // ===========================================

    return {
      success: true,
      message: "Notification sent successfully",

      totalTokens: tokens.length,

      successCount: response.successCount,

      failureCount: response.failureCount,

      invalidTokensRemoved:
        invalidTokens.length,
    };
  } catch (error) {
    console.error(
      "Push Notification Error:",
      error
    );

    return {
      success: false,
      message: "Failed to send notification",
      error: error.message,
    };
  }
};

module.exports = sendPushNotification;