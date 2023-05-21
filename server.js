const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const authRoutes = require('./auth');
const dashboard = require('./dashboard');
const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//MongoDB connection
mongoose
  .connect(
    "mongodb+srv://SivaChow:j8802vQScp0pKqO6@cluster0.aoufobc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.render('dashboard');
});

app.use('/', authRoutes);
app.use('/', dashboard);

process.env["SECRET"] = "foo";

app.use(
  session({
    secret: "my-secret-key", // Replace with your actual secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://SivaChow:j8802vQScp0pKqO6@cluster0.aoufobc.mongodb.net/?retryWrites=true&w=majority", // Replace with your MongoDB connection URL
      autoRemove: "interval",
      autoRemoveInterval: 60, // Number of minutes after which to remove expired sessions
    }),
  })
);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
