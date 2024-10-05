// //===============inputs================//

const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

// //===============Routes================//

router.get('/', (req, res) => {
    res.render('rsvp/index.ejs')
  });
router.get('/new', (req, res) => {
      res.render('rsvp/new.ejs')
  })
router.get('/rsvp/new', (req, res) => {
    res.render('rsvp/new.ejs')
})
router.post('/', async(req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.rsvp.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${req.session.user._id}/rsvp`)
    }catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
router.get('/:id', async (req, res) => {
  try {
    const rsvp = await rsvp.findById(req.params.id);
    if (!rsvp) {
      return res.status(404).send('Not Found');
    }
    
    res.render('rsvp/show.ejs', { rsvp }); 
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});
module.exports = router;



