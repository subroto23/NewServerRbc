const sendChatNotification = require("./chatNotification");


const chatNotificationController = async (req, res) => {
  try {
    const {
      title,
      message,
      room,
      senderId,
      senderName,
      deepLink,
    } = req.body;

    // validation
    if (!message || !senderId) {
      return res.status(400).json({
        success: false,
        message: "message and senderId required",
      });
    }

    const result = await sendChatNotification({
      title,
      message,
      room: room || "group_chat",
      senderId,
      senderName,
      deepLink,
    });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: "Notification failed",
        error: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat notification sent",
      data: result.response,
    });

  } catch (error) {
    console.error("Chat Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = chatNotificationController;