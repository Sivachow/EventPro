const express = require("express");
const connectDB = require("./config/db");
const app = express();

const authRoutes = require("./routes/auth/auth");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

//MongoDB connection
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

//Home Routes
app.get("/", (req, res) => {
  res.render("home");
});
app.use(express.static("/Users/siva/Desktop/EvenPro/"));

//Auth Routes

for (const route in authRoutes) {
  app.use("/", authRoutes[route]);
}

app.use("/", require("./routes/dashboard"));
app.use("/", require("./routes/profile"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
