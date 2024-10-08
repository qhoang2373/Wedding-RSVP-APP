const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id).populate('rsvp');
    console.log(currentUser.rsvp); 
    res.render('rsvp/index.ejs', {
      rsvp: currentUser.rsvp,
      user: currentUser
    });
  } catch (error) {
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  res.render('rsvp/new.ejs')
})

router.get('/:rsvpId', async (req, res) => {
  try{
      const currentUser = await User.findById(req.session.user._id)
      const rsvp = currentUser.rsvp.id(req.params.rsvpId)
      res.render('rsvp/show.ejs', {
          rsvp: rsvp
      })
  } catch(error) {
      res.redirect('/')
  }
})

router.get('/:rsvpId/edit', async (req, res) => {
  try{
      const currentUser = await User.findById(req.session.user._id)
      const rsvp = currentUser.rsvp.id(req.params.rsvpId)
      res.render('rsvp/edit.ejs', {
          rsvp: rsvp
      })
  } catch (error) {
      res.redirect('/')
  }
  })

router.post('/', async (req,res) => {
  try{
      const currentUser = await User.findById(req.session.user._id)
    currentUser.rsvp.push(req.body)
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/rsvp`);
  } catch (error) {
      res.redirect('/')
  }
})

router.put('/:rsvpid', async (req, res) => {
try {
  const currentUser = await User.findById(req.session.user._id)
  console.log(currentUser)
  const guest = currentUser.rsvp.id(req.params.rsvpid)
  console.log(guest)
  guest.set(req.body)
  await currentUser.save()
    res.redirect(`/users/${currentUser._id}/rsvp/`);
} catch (error) {
    res.redirect('/')
}
})

router.delete('/:rsvpId', async (req,res) => {
  try {
      const currentUser = await User.findById(req.session.user._id)
      currentUser.rsvp.id(req.params.rsvpId).deleteOne()
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/rsvp`)
  } catch (error) {
      res.redirect('/')
  }
})

module.exports = router

