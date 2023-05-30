const express = require("express");
const router = express.Router();

router.get("/tournaments", (req, res) => {
  res.render("tournaments");
});

module.exports = router;