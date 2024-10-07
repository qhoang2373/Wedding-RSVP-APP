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

  // =============== routes =================== //
app.use(passUserToView)
app.get('/', (req, res) => {
  if(req.session.user){
      res.redirect(`/users/${req.session.user._id}/repertoire`)
  }else {
      res.render('index.ejs')
  }
})

app.user('/auth', authController)
app.use(isSignedIn)
app.use('/users/:userId/rsvp', rsvpController)


app.listen(3000, () => {
  console.log("Listening on port 3000");
})













































































































// //===============Routes================//
// // app.get('/', async (req, res) => {
// //   res.render('index.ejs', { user: req.session.user });
// // });

// //=============== HomePage ================//
// app.get('/', async (req, res) => {
//   if (req.session.user) {
//       res.redirect(`/users/${req.session.user._id}/rsvp`)
//   } else {
//     const user = req.session.user;
//       res.render('index.ejs', { user })    
//   }       
// })

// app.get('/rsvp', async (req, res) => {
//   try {
//     const user = req.session.user;
//     const rsvps = await Rsvp.find({ userId: user._id }); 
//     res.render('rsvp/index.ejs', { user, rsvps });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // //=============== HomePage ================//
// app.get('/rsvp', async (req,res) => {
//   res.render('rsvp/index.ejs', { user: req.session.user });
// });

// //=============== New ================//
// app.get('/rsvp/new', async (req, res) => {
//   const user = req.session.user;
//   res.render('rsvp/new.ejs', { user });
// });

// //=============== Edit ================//
// app.get('/rsvp/edit', async (req, res) => {
//   const user = req.session.user;
//   res.render('rsvp/edit.ejs', { user });
// });

// //=============== Index ================//
// app.get('/rsvp/index', async (req, res) => {
//   const user = req.session.user;
//   res.render('rsvp/index.ejs', { user });
// });

// app.get('/rsvp', async (req, res) => {
//   try {
//     const user = req.session.user;
//     const rsvps = await Rsvp.find({ userId: user._id }); 
//     res.render('rsvp/index.ejs', { user, rsvps });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get("/rsvp/:rsvpId", async (req, res) => {
//   try {
//     const rsvp = await Rsvp.findById(req.params.rsvpId); // Use Rsvp model directly
//     if (!rsvp) {
//       return res.status(404).send('RSVP not found'); // Handle non-existent RSVP
//     }
//     res.render("rsvp/show.ejs", { rsvp });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// //=============== Delete ================//
// app.delete('/rsvp/:rsvpId', async(req,res) => {
//   await rsvp.findByIdAndDelete(req.params.rsvpId)
//   res.redirect('/rsvp')
// });

// //=============== Create ================//
// // app.post('/rsvp', async(req, res) => {
// //   if(req.body.willBeAttending === 'on'){
// //       req.body.willBeAttending = true
// //   } else {
// //       req.body.willBeAttending = false
// //   }
// //   await rsvp.create(req.body)
// //   res.redirect('/rsvp');
// // });



// app.post('/rsvp', async(req, res) => {
//   const user = req.session.user;
//     const rsvps = await Rsvps.findByID({ userId: user._id }); 
//   await rsvps.create(req.body)
//   res.render('rsvp');
// });


app.use(passUserToView);
app.use('/auth', authController);
app.use(isSignedIn);
// app.use('/users/:userId/rsvp', rsvpsController);
app.use('/rsvp', rsvpsController);

app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
