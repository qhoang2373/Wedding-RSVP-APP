// //===============inputs================//

const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

// //===============Routes================//

router.get('/', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id)
      res.render('rsvp/index.ejs', {
          rsvp: currentUser.rsvp
      })
  } catch(error) {
      res.redirect('/')
  }
})

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
      res.render('wines/edit.ejs', {
          rsvp: rsvp
      })
  } catch (error) {
      res.redirect('/')
  }
  })

router.post('/:rsvpId', async (req,res) => {
  try{
      const currentUser = await User.findById(req.session.user._id)
    currentUser.rsvp.push(req.body)
      await currentUser.save()
      res.redirect('/users/${currentUser._id}/rsvp')
  } catch (error) {
      res.redirect('/')
  }
})

router.put('/:rsvpid', async (req, res) => {
try {
  const currentUser = await User.findById(req.session.user._id)
  const rsvp = currentUser.rsvp.id(req,params.rsvpId)
  rsvp.set(req.body)
  await currentUser.save()
  res.redirect('/users/${currentUser._id}/rsvp/${req.params.winesbyId}')
} catch (error) {
  res.redirect('/')
}
})


router.delete('/:rsvpId', async (req,res) => {
  try {
      const currentUser = await User.findById(req.session.user._id)
      currentUser.rsvp.id(req.params.rsvpId).deleteOne()
      await currentUser.save()
      res.redirect('/users/${currentUser._id}/rsvp')
  } catch (error){
      res.redirect('/')
  }
})
module.exports = router



