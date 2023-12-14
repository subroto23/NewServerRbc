const nodemailer = require("nodemailer");

const { smtpUserName, smtpPassword } = require("../secret");
const createHttpError = require("http-errors");
const sendingMail = async (emailData) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUserName,
        pass: smtpPassword,
      },
    });

    if (!emailData) {
      throw createHttpError(
        "Sorry email,subject and html code not empty or typed error "
      );
    }

    if (!smtpUserName || !smtpPassword) {
      throw createHttpError("Provider Email and password are required");
    }

    const info = await transporter.sendMail({
      from: smtpUserName, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    });

    if (!info) {
      throw createHttpError(412, "We are unable to send email...");
    }
  } catch (error) {
    throw createHttpError(410, "sending mail failed");
  }
};

module.exports = { sendingMail };
