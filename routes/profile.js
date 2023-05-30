const express = require('express');
const router = express.Router();
const authorize = require("../middleware/auth");
const User = require("../modules/User");
router.get('/profile', authorize, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }
    catch(err){
        console.error(err);
    }
    //res.render('profile'); 
  });
  module.exports = router;