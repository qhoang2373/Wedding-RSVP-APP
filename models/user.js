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
  plusOne: {
    type: String,
    willBeAttending: Boolean,
  },
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
    rsvp: [rsvpSchema],
});

const User = mongoose.model('User', userSchema);           

module.exports = User;  
// const rsvp = mongoose.model('User', rsvpSchema);


