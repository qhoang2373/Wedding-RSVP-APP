//===============inputs================//
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const Rsvps = require('./models/user.js');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const authController = require('./controllers/auth.js');
const rsvpsController = require('./controllers/rsvps.js');

const Rsvp = require('./models/user.js');


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

//===============Routes================//
// app.get('/', async (req, res) => {
//   res.render('index.ejs', { user: req.session.user });
// });

//=============== HomePage ================//
app.get('/', (req, res) => {
  if (req.session.user) {
      res.redirect(`/users/${req.session.user._id}/rsvp`)
  } else {
    const user = req.session.user;
      res.render('index.ejs', { user })    
  }       
})

app.get('/rsvp', async (req, res) => {
  try {
    const user = req.session.user;
    const rsvps = await Rsvp.find({ userId: user._id }); 
    res.render('rsvp/index.ejs', { user, rsvps });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// //=============== HomePage ================//
app.get('/rsvp', async (req,res) => {
  res.render('rsvp/index.ejs', { user: req.session.user });
});

//=============== New ================//
app.get('/rsvp/new', async (req, res) => {
  const user = req.session.user;
  res.render('rsvp/new.ejs', { user });
});

//=============== Edit ================//
app.get('/rsvp/edit', async (req, res) => {
  const user = req.session.user;
  res.render('rsvp/edit.ejs', { user });
});

//=============== Index ================//
app.get('/rsvp/index', async (req, res) => {
  const user = req.session.user;
  res.render('rsvp/index.ejs', { user });
});

app.get('/rsvp', async (req, res) => {
  try {
    const user = req.session.user;
    const rsvps = await Rsvp.find({ userId: user._id }); 
    res.render('rsvp/index.ejs', { user, rsvps });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


//=============== Delete ================//
app.delete('/rsvp/:rsvpId', async(req,res) => {
  await rsvp.findByIdAndDelete(req.params.rsvpId)
  res.redirect('/rsvp')
});

//=============== Create ================//

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



























// const dotenv = require('dotenv');
// dotenv.config();
// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const methodOverride = require('method-override');
// const morgan = require('morgan');
// const session = require('express-session'); 

// // const Rsvp = require('./models/Rsvp.js'); 

// //===============Mongoose================//

// mongoose.connect(process.env.MONGODB_URI);
// mongoose.connection.on('connected', () => {
//   console.log(`Connected to MongoDB`);
// });

// //===============Middleware=================//

// app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride('_method'));
// app.use(morgan('dev'));
// app.use(
//     session({
//       secret: process.env.SESSION_SECRET,
//       resave: false,
//       saveUninitialized: true,
//     })
//   );


// //===============Routes================//

// // Home Page
// app.get('/', (req, res) => {
//   res.render('index.ejs');
// });

// // Get all RSVPs (modify if needed based on user roles)
// app.get('/rsvp', async (req, res) => {
//   try {
//     const rsvps = await Rsvp.find();
//     res.render('rsvp/index.ejs', { rsvps });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Get new RSVP form
// app.get('/rsvp/new', (req, res) => {
//   res.render('rsvp/new.ejs');
// });

// // Get details of a specific RSVP
// app.get('/rsvp/:rsvpId', async (req, res) => {
//   try {
//     const rsvp = await Rsvp.findById(req.params.rsvpId);
//     if (!rsvp) {
//       return res.status(404).send('RSVP not found');
//     }
//     res.render('rsvp/show.ejs', { rsvp });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Edit a specific RSVP (modify based on authorization)
// app.get('/rsvp/:rsvpId/edit', async (req, res) => {
//   try {
//     const rsvp = await rsvp.findById(req.params.rsvpId);
//     if (!rsvp) {
//       return res.status(404).send('RSVP not found');
//     }
//     res.render('rsvp/edit.ejs', { rsvp });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.delete('/rsvp/:rsvpId', async(req,res) => {
//   await rsvp.findByIdAndDelete(req.params.rsvpId)
//   res.redirect('/rsvp')
// });

// app.post('/rsvp', async(req, res) => {
//   if(req.body.willBeAttending  === 'on'){
//       req.body.willBeAttending  = true
//   } else {
//       req.body.willBeAttending  = false
//   }
//   await rsvp.create(req.body)
//   res.redirect('/rsvp');
// });

// app.use

// app.listen(3000, () => {
//   console.log("Listening on port 3000");
// });



