const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  res.send("Logged Out");
});
module.exports = router;