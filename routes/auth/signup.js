const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../modules/User");
const config = require("config");
const getRating = require("../../middleware/cfcID");

// Signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  let {
    username,
    password,
    conf_password,
    first_name,
    last_name,
    cfc_id,
    prov,
  } = req.body;
  console.log(
    username,
    password,
    conf_password,
    first_name,
    last_name,
    cfc_id,
    prov
  );
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(409).send("Invalid Creds");
    } else if (password != conf_password) {
      res.status(409).send("Invalid Creds");
    }
    const cfc_rating = await getRating(cfc_id);
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const new_user = new User({
      username,
      password,
      first_name,
      last_name,
      cfc_id,
      cfc_rating,
      prov,
    });
    await new_user.save();
    const payload = {
      user: {
        id: new_user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        console.log(token);
        res.json({ token, msg: "Signup Success" });
      }
    );
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
