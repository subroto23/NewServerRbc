// const cron = require("node-cron");
const moment = require("moment");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { EventsModel, authUser } = require("../src/Dbconfig/DatabaseConfig");
const { userEmail, smtpPasswordLatest } = require("../src/secret");

const EventsSendSms = async (req, res) => {
  // Data Getting
  const eventsData = await EventsModel.aggregate([
    {
      $match: {
        date: { $gt: moment().format("YYYY-MM-DD") },
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

  // const receviewEmails = eventReceiverEmail[0]?.allEmails?.join(",");
  const receviewEmails = eventReceiverEmail[0]?.allEmails;

  const dateObject = new Date(eventsData[0]?.date);

  // Get the day of the week (Sunday is 0 and Saturday is 6)
  const dayOfWeek = dateObject.getDay();

  // Array of Bengali day names
  const bengaliDayNames = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];

  // Get the Bengali day name
  const bengaliDayName = bengaliDayNames[dayOfWeek];

  //Send Schedule SMS
  receviewEmails?.map(async (receiveEmail) => {
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
      to: `${receiveEmail}`,
      bcc: `${receiveEmail}`,
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
            <h1>${eventsData[0]?.date} তারিখ রোজ ${bengaliDayName} ${
        eventsData[0]?.title
      }</h1>
            <p>${eventsData[0]?.subtitle || "আগামীদিনের উৎসব জেনে নিন"}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="body">
            <p>প্রিয়,</p>
            <p>${req?.body?.text}</p>
            <p>রূপসী বাংলা ক্লাবের পক্ষ থেকে আপনাকে জানাই আন্তরিক শুভেচ্ছে।আপনার অবগতির জন্য জানানো যাচ্ছে যে,রূপসী বাংলা ক্লাবের ওয়েবসাইটের মাধ্যমে ঘরে বসেই যেকোনো তথ্য আপনি জানতে পারবেন।</p>
               <p>রূপসী বাংলা ক্লাবের ওয়েবসাইটে প্রবেশ করে জানতে পারবেন বিগত সালের পূজা বাবদ আয়/ব্যায় , আপনার পূজার চাঁদা,সামনে কি অনুষ্ঠান আসিতেছে তার দিনক্ষন সহ আরো অনেক কিছু।</p>
            <p>এখনি ঘুরে আসুন আমাদের ওয়েবসাইটে<br><a target="_blank" href="https://rbcweb.vercel.app">এখানে চাপ দিন</a></p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td class="footer">
            <p>রূপসী বাংলা ক্লাব | তথ্য-প্রযুক্তি বিভাগ </p>
          </td>
        </tr>
        <tr>
            <td>
            <div style="font-family: Arial, sans-serif; margin-top: 40px; margin-bottom: 10px;">
            <div style="padding: 1rem; text-align: center;">
                <div style="border-bottom: 1px solid #000;">
                    <h1 style="font-size: 1.25rem; font-weight: bold; margin-top: 0.25rem; margin-bottom: 0.25rem;">সুব্রত দাস</h1>
                    <p style="font-size: 0.875rem; margin-bottom: 0.5rem;">প্রচার-সম্পাদক | <a href="https://portfolio-lovat-alpha-41.vercel.app/" style="color: #3b82f6;">আরো জানুন</a></p>
                </div>
                <div style="display: flex; align-items: center;">
                    <div>
                        <img src="https://imgbb.host/images/WXse.png" alt="Photo" style="margin-left: auto; margin-right: auto; margin: 1rem; width: 13rem;" />
                    </div>
                    <div>
                        <ul style="text-align: left; font-size: 0.875rem;">
                            <li>ই-মেইল: <a href="mailto:subroto23das@gmail.com" style="color: #3b82f6;">subroto23das@gmail.com</a></li>
                            <li>মোবাইল: +৮৮ ০১৫ ২১৪০ ৯১৫৫</li>
                            <li>ঠিকানা: কাদিরদী,বোয়ালমারী, ফরিদপুর,, পোস্টঃ ৭৮০১</li>
                            <li>যোগাযোগঃ 
                            <a href="https://www.linkedin.com/in/subroto-das-94b0672b9/" style="color: #3b82f6;">www.linkedin.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style="background-color: #e2e8f0; padding: 1rem; text-align: center; margin-top: 1rem; border-radius: 0.375rem;">
                    <p style="font-size: 0.875rem;">'রূপসী বাংলা ক্লাব " এর তথ্য প্রযুক্তি বিষয়ক যেকোনো ধরনের পরামর্শ কিংবা অভিযোগের জন্য যোগাযোগ করুন সোম থেকে শুক্র  সকাল ৯ টা থেকে রাত ১০ টা পর্যন্ত। আপনার পরামর্শ কিংবা অভিযোগ আমরা সন্মানের সাথে গ্রহণ করবো। ধন্যবাদ।</p>
                </div>
            </td>
          </tr>
      </table>
    </body>

    </html>
        `,
    };
    await transporter
      .sendMail(mailOptions)
      .then(() => {
        return res
          .status(200)
          .send({ success: true, message: "Email Send Successfully" });
      })
      .catch((err) =>
        res.status(200).send({ success: false, message: "Email Not Send " })
      );
  });
};
module.exports = EventsSendSms;
