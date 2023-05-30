const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../modules/User");
const config = require("config");

// Login route
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user_login = await User.findOne({ username });

    if (!user_login) {
      return res.status(400).json({ msg: "Invalid Creds" });
    }

    if (!bcrypt.compare(password, user_login.password)) {
      console.log("Invalid Creds");
      return res.status(400).json({ msg: "Invalid Creds" }); // Incorrect password, redirect back to the login page
    }

    const payload = {
      user: {
        id: user_login.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        console.log(token);
        res.json({ msg: "Login Successfull", t: token });
      }
    );
  } catch (error) {
    console.error("Error during login:", error);
    res.redirect("/login"); // Handle any error during the login process
  }
});

module.exports = router;
