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
    name,
    email,
    password,
    cfc_id,
    province,
  } = req.body;
  try {
    const user = await User.findOne({ email });
    const cfc_exists = await User.findOne({ cfc_id });
    if (user) {
      res.status(400).json({errors : [{msg: "User Already Exists"}]});
      return;
    }
    if (cfc_exists) {
      res.status(400).json({errors : [{msg: "CFC ID Already Exists"}]});
      return;
    }
    let cfc_rating;
    if(cfc_id)
      cfc_rating= await getRating(cfc_id);
    else
      cfc_rating = 0;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const new_user = new User({
      email,
      password,
      name,
      cfc_id,
      cfc_rating,
      province,
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
