const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DueRoute = require("./Router/DueRoute/DueRoutes");
const NewsRoute = require("./Router/NewsRoute/NewsRoute");
const eventRoute = require("./Router/EventRoute/EventsRoute");
const TittleRoute = require("./Router/Title Route/TitleRoute");
const CadaRoute = require("./Router/CadaRoute/CadaCollectRoute");
const AuthRouter = require("./Router/UserAuth/UserAuthRoute");
const MonthCadaRoute = require("./Router/MonthCadaRoute/MonthCadaRoute");
const pujaparbonRoute = require("./Router/Pujaparbon/PujaParbonRoute");
const smsSendRoute = require("../schedulejob/EmailSendingRoute");
const notificaionRoute = require("./Router/NotificationRoute/NotificationRoute");
const bannerRouter = require("./Router/Banner/BannerRoute");
const earnRoutes = require("./modules/earnMoney/route");
const spendRoutes = require("./modules/spendMoney/route");
//MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//PujaParbo Route
app.use("/puja/parbon", pujaparbonRoute);

//MonthCada Route
app.use("/api/month/cada", MonthCadaRoute);

//notification
app.use("/api/v1", notificaionRoute);

//Auth Control
app.use("/api", AuthRouter);

// //Events Adding
app.use("/events", eventRoute);

//News Routes
app.use("/api/news", NewsRoute);

// // //Cada Routes
app.use("/cada/details", CadaRoute);

//Due Routes
app.use("/due/details", DueRoute);

// //Title Routes
app.use("/title/heading", TittleRoute);

//Event Send Sms
app.use("/api/v1/sms", smsSendRoute);

//Banner Adding
app.use("/api/v1", bannerRouter);

//Earn Routes
app.use("api/v1/earns", earnRoutes);

//Spend Routes
app.use("api/v1/spends", spendRoutes);
module.exports = app;
