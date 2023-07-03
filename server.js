const express = require("express");
const connectDB = require("./config/db");
const app = express();

const routeList = require("./routes/index");

const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");

//MongoDB connection
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

//Home Routes

app.use(express.static("/Users/siva/Desktop/EvenPro/"));

//Auth Routes

for (const route in routeList) {
  app.use("/", routeList[route]);
}

app.use("/", require("./routes/dashboard"));
app.use("/", require("./routes/profile"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
 