const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    console.log("Logged in");
    res.render('dashboard'); 
});

module.exports = router;