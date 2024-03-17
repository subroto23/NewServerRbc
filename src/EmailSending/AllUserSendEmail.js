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
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
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
        <p>আপনার অবগতির জন্য জানানো যাচ্ছে যে,রূপসী বাংলা ক্লাবের ওয়েবসাইটের মাধ্যমে ঘরে বসেই যেকোনো তথ্য আপনি জানতে পারবেন।</p>
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
  </table>

  <div class="font-sans my-4">
      <div class="bg-gray-200 p-4 text-center">
        <div class="border-b border-black">
          <h1 class="text-xl font-bold my-1">সুব্রত দাস</h1>
          <p class="text-sm mb-2">প্রচার-সম্পাদক | <a href="https://portfolio-lovat-alpha-41.vercel.app/" class="text-blue-500">আরো জানুন</a></p>
        </div>
        <div class="flex items-center">
          <div>
            <img src="https://imgbb.host/images/WXse.png" alt="Photo" class="mx-auto m-4 w-52" />
          </div>
          <div>
          <ul class="text-left text-sm">
            <li>ই-মেইল: <a href="mailto:subroto23das@gmail.com" class="text-blue-500">subroto23das@gmail.com</a></li>
            <li>মোবাইল: +৮৮ ০১৫ ২১৪০ ৯১৫৫</li>
            <li>ঠিকানা: কাদিরদী,বোয়ালমারী, ফরিদপুর,, পোস্টঃ ৭৮০১</li>
            <li class="flex gap-4">
              যোগাযোগ:
              <a href="https://www.facebook.com/subroto.das.568847/" class="text-blue-500">ফেসবুক</a>
              <a href="https://www.linkedin.com/in/subroto-das-94b0672b9/" class="text-blue-500">লিংকডইন</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-4 bg-gray-300 p-4 text-center">
        <p class="text-sm">'রূপসী বাংলা ক্লাব " এর তথ্য প্রযুক্তি বিষয়ক যেকোনো ধরনের পরামর্শ কিংবা অভিযোগের জন্য যোগাযোগ করুন সোম থেকে রবিবার সকাল ৯ টা থেকে রাত ১০ টা পর্যন্ত।আপনার পরামর্শ কিংবা অভিযোগ আমরা সন্মানের সাথে গ্রহণ করবো।ধন্যবাদ।</p>
      </div>
         <img src="https://imgbb.host/images/WiSQ.png" alt="Photo" class="mx-auto  w-full rounded-md" />
    </div>

</body>

</html>
    `,
  };

  //Send Email
  await transporter.sendMail(mailOptions);
};
module.exports = sendingMail;
