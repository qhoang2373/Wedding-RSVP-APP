//===============inputs================//
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')
const path = require('path')
const session = require('express-session')

// =============== Controllers =================== //
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const authController = require('./controllers/auth.js');
const rsvpController = require('./controllers/rsvps.js');


//===============Mongoose================//

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB`);
});

//===============Middleware=================//

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(passUserToView)

  // =============== routes =================== //

app.get('/', (req, res) => {
  if(req.session.user){
      res.redirect(`/users/${req.session.user._id}/rsvp`)
  }else {
      res.render('index.ejs')
  }
})


app.use('/auth', authController)
app.use(isSignedIn)
app.use('/users/:userId/rsvp', rsvpController)
// app.use('/rsvp', rsvpController)

  // =============== Port =================== //
app.listen(3000, () => {
  console.log("Listening on port 3000");
})































































