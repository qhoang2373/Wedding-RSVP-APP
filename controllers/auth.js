const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.js')

// ======== Sign Up, Sign in, Sign out =========// 
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs')
})

router.get('/sign-out', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

// ================= Create your user Account ============== //
router.post('/sign-up', async (req, res) => {
    try {
      const userInDatabase = await User.findOne({ username: req.body.username })
      if (userInDatabase) {
      return res.send('Username already exists. Try Again.')
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Password must match')
      }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    const user = await User.create(req.body)
    res.redirect('/auth/sign-in.ejs');

} catch (error) {
    console.log(error);
    res.redirect('/');
  }
})

// ================= User Sign-in ============== //
router.post('/sign-in', async (req, res) => {
    try {

      const userInDatabase = await User.findOne({ username: req.body.username });
      if (!userInDatabase) {
        return res.send('Login failed. Please try again.');
      }
    
      const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
      )

      if (!validPassword) {
        return res.send('Login failed. Please try again.')
      }
    
      req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id,
      }
    
      res.redirect('/rsvp');
    } catch (error) {
  
      res.redirect('/rsvp')
    }
  })
  
  module.exports = router;
