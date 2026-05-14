const { notification } = require("../../Dbconfig/DatabaseConfig");

const notificationPostController = async (req, res) => {
  try {
    const { token, email, name } = req.body;

    // Validation
    if (!email || !token) {
      return res.status(400).json({
        success: false,
        message: "Email and token are required",
      });
    }

    // Check existing user
    const existingUser = await notification.findOne({ email });

    // =========================
    // USER EXISTS
    // =========================
    if (existingUser) {

      // Token changed / expired / refreshed
      if (existingUser.token !== token) {

        const updatedResult = await notification.findOneAndUpdate(
          { email },
          {
            $set: {
              token,
              name: name || existingUser.name || "",
              updatedAt: new Date(),
            },
          },
          {
            returnDocument: "after",
          }
        );

        return res.status(200).json({
          success: true,
          message: "Token refreshed successfully",
          data: updatedResult,
        });
      }

      // Same token
      return res.status(200).json({
        success: true,
        message: "Token already valid",
      });
    }

    // =========================
    // NEW USER
    // =========================
    const result = await notification.insertOne({
      email,
      token,
      name: name || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Notification token saved successfully",
      insertedId: result.insertedId,
    });

  } catch (error) {
    console.error("Notification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = notificationPostController;