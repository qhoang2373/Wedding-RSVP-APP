const mongoose = require('mongoose')

const rsvpSchema = new mongoose.Schema({
 firstName: {
    type: String,
    required: true
 },
 lastName: {
  type: String,
  required: true
},
  plusOne: {
    type: String,
  }
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
    rsvp: [rsvpSchema]
});

const User = mongoose.model('User', userSchema);           

module.exports = User;  
// const rsvp = mongoose.model('User', rsvpSchema);


