const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DueRoute = require("./Router/DueRoute/DueRoutes");
const NewsRoute = require("./Router/NewsRoute/NewsRoute");
const eventRoute = require("./Router/EventRoute/EventsRoute");
const TittleRoute = require("./Router/Title Route/TitleRoute");
const CadaRoute = require("./Router/CadaRoute/CadaCollectRoute");
const path = require('path');

//MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// //Users Routers Creating
// app.use("/api/users", userRouter);

// // //Auth Router
// app.use("/auth", authRouter);

// // //Sheed users
// app.use("/api/sheeds/users", sheedRouter);

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

module.exports = app;
