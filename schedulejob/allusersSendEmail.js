const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { userEmail, smtpPasswordLatest } = require("../src/secret");
const { authUser } = require("../src/Dbconfig/DatabaseConfig");

const MonthCadaDueSms = async (req, res) => {
  const data = req.body;
  try {
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

    const receviewEmails = eventReceiverEmail[0]?.allEmails;

    receviewEmails.map(async (email) => {
      // if (email === "roygourango140@gmail.com") {
      //   return;
      // }
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
        from: `${userEmail}`,
        to: `${email}`,
        bcc: `${email}`,
        subject: `${data?.subject}`,
        html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${data?.subject}</title>
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
          #customers {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          
          #customers td, #customers th {
            border: 1px solid #ddd;
            padding: 8px;
          }
          
          #customers tr:nth-child(even){background-color: #f2f2f2;}
          
          #customers tr:hover {background-color: #ddd;}
          
          #customers th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #04AA6D;
            color: white;
          }
        </style>
      </head>
      
      <body>
        <table>
          <!-- Header -->
          <tr>
            <td class="header">
              <h1>${data?.subject}</h1>
            </td>
          </tr>
      
          <!-- Body -->
          <tr>
            <td class="body">
              <p>${data?.text}</p>
              </br>
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
      </html>`,
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
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = MonthCadaDueSms;
