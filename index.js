const { mongodbConnection } = require("./src/Dbconfig/DatabaseConfig");
const app = require("./src/app");
const { PortNumber } = require("./src/secret");

const eventsEmailSend = require("./src/EmailSending/EventsSendingGenerator");
const monthlyDueSms = require("./src/EmailSending/MonthlyDueSms");

//
app.listen(PortNumber, async () => {
  console.log(`server is running on the http://localhost:${PortNumber}`);
  await mongodbConnection();
});

//Email Sending
const emailSendingGenerator = async () => {
  await eventsEmailSend();
  await monthlyDueSms();
};
emailSendingGenerator();
