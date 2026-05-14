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

  <div style="font-family: Arial, sans-serif; margin-top: 10px; margin-bottom: 10px;">
    <div style="background-color: #edf2f7; padding: 1rem; text-align: center;">
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
                    <li style="display: flex; gap: 1rem;">যোগাযোগ: <a href="https://www.facebook.com/subroto.das.568847/" style="color: #3b82f6;">ফেসবুক</a> <a href="https://www.linkedin.com/in/subroto-das-94b0672b9/" style="color: #3b82f6;">লিংকডইন</a></li>
                </ul>
            </div>
        </div>
        <div style="background-color: #e2e8f0; padding: 1rem; text-align: center; margin-top: 1rem; border-radius: 0.375rem;">
            <p style="font-size: 0.875rem;">'রূপসী বাংলা ক্লাব " এর তথ্য প্রযুক্তি বিষয়ক যেকোনো ধরনের পরামর্শ কিংবা অভিযোগের জন্য যোগাযোগ করুন সোম থেকে রবিবার সকাল ৯ টা থেকে রাত ১০ টা পর্যন্ত। আপনার পরামর্শ কিংবা অভিযোগ আমরা সন্মানের সাথে গ্রহণ করবো। ধন্যবাদ।</p>
        </div>
    </div>
       <img src="https://imgbb.host/images/WiSQ.png" alt="Photo" style="display: block; margin-left: auto; margin-right: auto; width: 100%; max-width: 100%;" />
      
</div>

</body>

</html>
    `,
  };

  //Send Email
  await transporter.sendMail(mailOptions);
};
module.exports = sendingMail;
