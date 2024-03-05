const cron = require("node-cron");
const moment = require("moment");
const nodemailer = require("nodemailer");

const { EventsModel, authUser } = require("../Dbconfig/DatabaseConfig");
const { smtpPasswordLatest, userEmail } = require("../secret");
//Event Scheduler Email Sends
const eventsEmailSend = async () => {
  const currentDate = moment().format("YYYY-MM-DD");
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
  const dateConvert = eventsData[0]?.date.split("-");
  const formetedScheduleTime = `0 0 ${dateConvert[2]} ${dateConvert[1]} *`;
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
  const receviewEmails = eventReceiverEmail[0].allEmails?.join(",");
  //Send Schedule SMS
  cron.schedule(formetedScheduleTime, async () => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: `${userEmail}`,
        pass: `${smtpPasswordLatest}`,
      },
    });

    const mailOptions = {
      from: `${userEmail}`,
      to: receviewEmails,
      bcc: receviewEmails,
      subject: `আজ ${eventsData[0]?.subtitle}`,
      html: `
        <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>আজ ${eventsData[0]?.subtitle}</title>
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
            <h1>আজ ${eventsData[0]?.title}</h1>
            <p>${eventsData[0]?.subtitle}</p>
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

    //Send Email
    await transporter.sendMail(mailOptions);
  });
};
module.exports = eventsEmailSend;
