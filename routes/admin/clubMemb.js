const express = require("express");
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');

router.get("/club-membership", adminAuth, (req, res) => {
    res.json({msg : "IN club MEMB page"});
});

module.exports = router;