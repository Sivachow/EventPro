const express = require('express');
const router = express.Router();
const authorize = require("../middleware/auth");
const User = require("../modules/User");
router.get('/profile', authorize, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(400).json({msg: "No profile exists for thi user"});
        }
        res.json(user);
    }
    catch(err){
        return res.status(400).json({msg: "Profile Error"});
    }
  });
  module.exports = router;