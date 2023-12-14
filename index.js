const { mongodbConnection } = require("./src/Dbconfig/DatabaseConfig");
const app = require("./src/app");
const { PortNumber } = require("./src/secret");

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(PortNumber, async () => {
  console.log(`server is running on the http://localhost:${PortNumber}`);
  await mongodbConnection();
});
