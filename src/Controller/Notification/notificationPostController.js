const { notification } = require("../../Dbconfig/DatabaseConfig");

const notificationPostController = async (req, res) => {
  try {
    const { token, email } = req.body;

    if (!email || !token) {
      return res.status(400).json({ message: "Email and Token are required" });
    }

    const isExist = await notification.findOne({ email });

    if (isExist) {
      if (isExist.token !== token) {
        const updatedResult = await notification.findOneAndUpdate(
          { email },
          { $set: { token } },
          { new: true }
        );

        if (!updatedResult) {
          return res.status(500).json({ message: "Failed to update token" });
        }

        return res.status(200).json(updatedResult);
      } else {
        return res.status(200).json({ message: "Token is already up to date" });
      }
    }

    // If email doesn't exist, insert a new document
    const newNotification = new notification({ email, token });
    const savedNotification = await newNotification.save();

    return res.status(201).json(savedNotification);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = notificationPostController;
