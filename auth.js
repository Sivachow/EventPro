const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./modules/User');

// Login route
router.get('/login', (req, res) => {
  res.render('login'); 
});

router.get('/signup', (req, res) => {
  res.render('signup'); 
});

router.post('/signup', async (req, res) =>{
  const{username, password, conf_password} = req.body;
  console.log(username, password, conf_password); 
  try{
    const user = await User.findOne({username});
    if(user){
      res.status(409);
      return res.redirect('signin');
    }
    else if(password !=conf_password){
      res.status(409);
      return res.redirect('signin');
    }
    const new_user = new User({username, password});
    await new_user.save();
    const successMessage = "Success Registration";
    res.render('signup', { successMessage });
  }
  catch(error){
    console.error(error);
  }
});
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.redirect('/login'); // User not found, redirect back to the login page
    }
    
    const passwordMatch = await user.password == password;

    if (!passwordMatch) {
      return res.redirect('/login'); // Incorrect password, redirect back to the login page
    }
    
    //req.session.user = user; // Store user information in the session
    res.redirect('/dashboard'); // Redirect to the dashboard or any other page after successful login
  } catch (error) {
    console.error('Error during login:', error);
    res.redirect('/login'); // Handle any error during the login process
  }
});

router.get('/header', (req, res) => {
  res.render('header');
})
// Logout route
router.get('/logout', (req, res) => {
  //req.session.destroy(); // Destroy the session
  res.send("Logged Out");
});
module.exports = router;