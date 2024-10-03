const mongoose = require('mongoose')

const rsvpSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true
 },
 date: {
    type: Date,
    required: true
 },
 location: {
    type: String,
    required: true
  },
  rsvps: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RSVP'
  },
   // it might be this instead of rsvps up top guests: [userSchema],
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    plusOne: Boolean, // maybe fix this line right here, its either number or ,string 

    // maybe add the firstName and lastName and admin from ERD
});



// maybe put a const rsvp here like so, const Rsvp = mongoose.model('rsvp', rsvpSchema)
const User = mongoose.model('User', userSchema)

module.exports = User;