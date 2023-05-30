const express = require("express");
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');

router.get("/tournment-membership", adminAuth, (req, res) => {
  res.json({msg : "IN tournment MEMB page"});
});

module.exports = router;