const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../modules/User");
const config = require("config");
const auth = require("../../middleware/auth")

// Login route
router.get("/login", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user_login = await User.findOne({ email });

    if (!user_login) {
      res.status(400).json({errors : [{msg: "Invalid Credentials"}]});
      return;
    }

    if (!bcrypt.compare(password, user_login.password)) {
      res.status(400).json({errors : [{msg: "Invalid Credentials"}]});
      return;
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
        res.json({ msg: "Login Successfull", token: token });
      }
    );
  } catch (error) {
    console.error("Error during login:", error);
    res.redirect("/login"); // Handle any error during the login process
  }
});

module.exports = router;
