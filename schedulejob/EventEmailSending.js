// const cron = require("node-cron");
const moment = require("moment");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { EventsModel, authUser } = require("../src/Dbconfig/DatabaseConfig");
const { userEmail, smtpPasswordLatest } = require("../src/secret");

const EventsSendSms = async (req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");
  // Data Getting
  const eventsData = await EventsModel.aggregate([
    {
      $match: {
        date: { $gte: currentDate },
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        email: 1,
        title: 1,
        subtitle: 1,
        date: 1,
      },
    },
  ]).toArray();

  //Events User Email
  const eventReceiverEmail = await authUser
    .aggregate([
      {
        $group: {
          _id: null,
          allEmails: { $push: "$email" },
        },
      },
      {
        $project: {
          _id: 0,
          allEmails: 1,
        },
      },
    ])
    .toArray();

  const receviewEmails = eventReceiverEmail[0]?.allEmails?.join(",");

  //Send Schedule SMS
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: `${userEmail}`,
        pass: `${smtpPasswordLatest}`,
      },
    })
  );

  const mailOptions = {
    from: `rupashi.bangla.club@gmail.com`,
    to: `${receviewEmails}`,
    bcc: `${receviewEmails}`,
    subject: `${eventsData[0]?.subtitle || "আগামীদিনের উৎসব জেনে নিন"}`,
    html: `
        <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${eventsData[0]?.subtitle || "আগামীদিনের উৎসব জেনে নিন"}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }

        table {
          max-width: 600px;
          margin: 0 auto;
        }

        /* Header Styles */
        .header {
          background-color: #3498db;
          color: #ffffff;
          text-align: center;
          padding: 20px;
        }

        /* Body Styles */
        .body {
          padding: 20px;
          background-color: #ffffff;
        }

        /* Footer Styles */
        .footer {
          text-align: center;
          padding: 10px;
          background-color: #3498db;
          color: #ffffff;
        }

        /* Responsive Styles */
        @media only screen and (max-width: 600px) {
          table {
            width: 100%;
          }

          .header,
          .body,
          .footer {
            padding: 10px;
          }
        }
      </style>
    </head>

    <body>
      <table>
        <!-- Header -->
        <tr>
          <td class="header">
            <h1>${eventsData[0]?.date} তারিখে  ${eventsData[0]?.title}</h1>
            <p>${eventsData[0]?.subtitle || "আগামীদিনের উৎসব জেনে নিন"}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="body">
            <p>প্রিয়,</p>
            <p>রূপসী বাংলা ক্লাবের পক্ষ থেকে আপনাকে জানাই আন্তরিক শুভেচ্ছে।আপনার অবগতির জন্য জানানো যাচ্ছে যে,রূপসী বাংলা ক্লাবের ওয়েবসাইটের মাধ্যমে ঘরে বসেই যেকোনো তথ্য আপনি জানতে পারবেন।</p>
               <p>rরূপসী বাংলা ক্লাবের ওয়েবসাইটে প্রবেশ করে জানতে পারবেন বিগত সালের পূজা বাবদ আয়/ব্যায় , আপনার পূজার চাঁদা,সামনে কি অনুষ্ঠান আসিতেছে তার দিনক্ষন সহ আরো অনেক কিছু।</p>
            <p>এখনি ঘুরে আসুন আমাদের ওয়েবসাইটে<br><a target="_blank" href="https://rbcweb.vercel.app">এখানে চাপ দিন</a></p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="footer">
            <p>রূপসী বাংলা ক্লাব | তথ্য-প্রযুক্তি বিভাগ </p>
          </td>
        </tr>
      </table>
    </body>

    </html>
        `,
  };

  return await transporter
    .sendMail(mailOptions)
    .then(() => {
      return res
        .status(200)
        .send({ success: true, message: "Email Send Successfully" });
    })
    .catch((err) =>
      res.status(200).send({ success: false, message: "Email Not Send " })
    );
};
module.exports = EventsSendSms;
