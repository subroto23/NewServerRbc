const moment = require("moment");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { monthcada } = require("../Dbconfig/DatabaseConfig");
const calculateTotalMonths = require("./calculateTotalMonths");
const previousMonthGenerator = require("./PreviousMonthGenerator");
const { userEmail, smtpPasswordLatest } = require("../secret");

require("moment/locale/bn");

const CalculateMonthAfterPaidClubCada = async (
  payMonthCountValue,
  ratePerMonth,
  email
) => {
  if (!email) {
    return "ই-মেইল পাওয়া যাচ্ছে না";
  }
  // Set locale to Bengali
  moment.locale("bn-en");
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
  const generatorMonth = previousMonthGenerator(result);

  const userBasedPrevCadaDetails = generatorMonth.find(
    (obj) => obj.email === email
  );

  const payBeforeMonthName = userBasedPrevCadaDetails?.prevMonthName;

  // Get the current date
  const currentDate = moment(payBeforeMonthName, "MMMM YYYY");
  const totalMonthDecrease = payMonthCountValue;
  const monthNumberCount = totalMonthDecrease - 1;

  // Add 2 months to the current date
  const nextMonth = currentDate.clone().add(monthNumberCount, "months");
  const payAfterMonthName = nextMonth.format("MMMM YYYY");
  //   const payAfterMonthCount = Number(
  //     userBasedPrevCadaDetails?.monthCount - totalMonthDecrease
  //   );

  //Send Paid Cada email

  const data = userBasedPrevCadaDetails;
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
    subject: `পেমেন্ট স্লিপ মাসিক চাঁদা`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>পেমেন্ট স্লিপ মাসিক চাঁদা</title>
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
            <h1>আপনার প্রদানকৃত মাসিক চাঁদা ${
              Number(totalMonthDecrease) * ratePerMonth
            } /= গৃহীত হয়েছে </h1>
              <p>আপনার এখনো ${
                (Number(data?.monthCount) - Number(payMonthCountValue)) *
                ratePerMonth
              } /= বকেয়া রয়েছে।</p>
            </td>
          </tr>
      
          <!-- Body -->
          <tr>
            <td class="body">
              <p>প্রিয় ${data?.name},</p>
              <h1>আপনার মাসিক চাঁদা পরিশোধের বিবারণ</h1>
              <table id="customers">
                <tr>
                  <th>শুরু মাস</th>
                  <th>শেষ মাস</th>
                  <th>মোট পরিশোধের মাস</th>
                  <th>মোট টাকা</th>
                </tr>
                <tr>
                  <td>${payBeforeMonthName} থেকে</td>
                  <td>${payAfterMonthName}</td>
                  <td>${payMonthCountValue}</td>
                  <td>${Number(payMonthCountValue) * ratePerMonth} /= </td>
                </tr>
              </table>
              </br>
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
      </html>`,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }

  //   return { payAfterMonthName, payBeforeMonthName, payAfterMonthCount };
};

module.exports = CalculateMonthAfterPaidClubCada;
