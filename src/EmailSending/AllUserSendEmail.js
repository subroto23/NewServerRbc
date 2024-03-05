const nodemailer = require("nodemailer");
const { smtpPasswordLatest, userEmail } = require("../secret");

const sendingMail = async (payload, receiverEmail) => {
  console.log(receiverEmail);
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
    to: receiverEmail,
    subject: `আজ ${payload?.subtitle}`,
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>আজ ${payload?.subtitle}</title>
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
        <h1>আজ ${payload?.title}</h1>
        <p>${payload?.subtitle}</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td class="body">
        <p>প্রিয়,</p>
        <p>রূপসী বাংলা ক্লাবের পক্ষ থেকে আপনাকে জানাই আন্তরিক শুভেচ্ছে।আপনার অবগতির জন্য জানানো যাচ্ছে যে,রূপসী বাংলা ক্লাবের ওয়েবসাইটের মাধ্যমে ঘরে বসেই যেকোনো তথ্য আপনি জানতে পারবেন।</p>
           <p>পসী বাংলা ক্লাবের ওয়েবসাইটে প্রবেশ করে জানতে পারবেন বিগত সালের পূজা বাবদ আয়/ব্যায় , আপনার পূজার চাঁদা,সামনে কি অনুষ্ঠান আসিতেছে তার দিনক্ষন সহ আরো অনেক কিছু।</p>
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
};
module.exports = sendingMail;
