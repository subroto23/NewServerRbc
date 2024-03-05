const cron = require("node-cron");
const nodemailer = require("nodemailer");
const moment = require("moment");
const { smtpPasswordLatest, userEmail } = require("../secret");
const { monthcada } = require("../Dbconfig/DatabaseConfig");
const calculateTotalMonths = require("../utlis/calculateTotalMonths");
const previousMonthGenerator = require("../utlis/PreviousMonthGenerator");
//Monthly Dues Scheduler Email Sends

const monthlyDueSms = async () => {
  //Monthly Dues Generator
  const totalMonths = calculateTotalMonths();
  const result = await monthcada
    .aggregate([
      {
        $project: {
          name: 1,
          email: 1,
          monthCount: {
            $abs: { $subtract: [{ $size: "$month" }, totalMonths] },
          },
        },
      },
      {
        $match: {
          monthCount: { $gt: 0 },
        },
      },
    ])
    .toArray();

  // Previous month Values Getiing
  const updatedResult = previousMonthGenerator(result);

  //Send Schedule SMS
  cron.schedule(`0 6 * * 1,3,5`, async () => {
    updatedResult.map(async (data) => {
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
        to: `${data?.email}`,
        bcc: `${data?.email}`,
        subject: `মাসিক চাঁদা বকেয়ার হিসাব`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>মাসিক চাঁদা বকেয়ার হিসাব</title>
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
                <h1>আপনার মাসিক চাঁদা ${data?.monthCount} মাস বকেয়া</h1>
                <p>দয়া করে ${
                  Number(data?.monthCount) * 50
                } /= দ্রুত প্রদান করুন</p>
              </td>
            </tr>
        
            <!-- Body -->
            <tr>
              <td class="body">
                <p>প্রিয় ${data?.name},</p>
                <h1>বকেয়া টেবিল</h1>

                <table id="customers">
                  <tr>
                    <th>শুরু</th>
                    <th>শেষ</th>
                    <th>মোট মাস</th>
                    <th>মোট টাকা</th>
                  </tr>
                  <tr>
                    <td>${data?.prevMonthName} থেকে</td>
                    <td>${data?.currMonthName}</td>
                    <td>${data?.monthCount}</td>
                    <td>${Number(data?.monthCount) * 50} /= </td>
                  </tr>
                </table>
                </br>
                <p>রূপসী বাংলা ক্লাবের পক্ষ থেকে আপনাকে জানাই আন্তরিক শুভেচ্ছে।আপনার অবগতির জন্য জানানো যাচ্ছে যে,রূপসী বাংলা ক্লাবের ওয়েবসাইটের মাধ্যমে ঘরে বসেই যেকোনো তথ্য আপনি জানতে পারবেন।</p>
                   <p>রূপসী বাংলা ক্লাবের ওয়েবসাইটে প্রবেশ করে জানতে পারবেন বিগত সালের পূজা বাবদ আয়/ব্যায় , আপনার পূজার চাঁদা,সামনে কি অনুষ্ঠান আসিতেছে তার দিনক্ষন সহ আরো অনেক কিছু।এছাড়াও রয়েছে বাংলা এবং ইংরেজি তারিখ দেখার সুবিধা।আপনি তাই এখন থেকে পঞ্জিকা না দেখেও জানতে পারবেন আজকের বাংলা তারিখ এবং আজ কি অনুষ্ঠান।</p>
                <p>এখনি ঘুরে আসুন আমাদের ওয়েবসাইটে<br><a target="_blank" href="https://rbcweb.vercel.app">এখানে চাপ দিন</a></p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td class="footer">
                <p>রূপসী বাংলা ক্লাব | তথ্য-প্রযুক্তি বিভাগ</p>
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
  });
};
module.exports = monthlyDueSms;
