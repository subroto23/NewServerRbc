const { mongodbConnection } = require("./src/Dbconfig/DatabaseConfig");
const app = require("./src/app");
const { PortNumber } = require("./src/secret");
//
let server;
async function bootstrap() {
  try {
    server = app.listen(PortNumber, async () => {
      console.log(`server is running on the http://localhost:${PortNumber}`);
      await mongodbConnection();
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
