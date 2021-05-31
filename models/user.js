const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: ['First name is a required field']
  },
  lastName: {
    type: String,
    required: ['Last name is a required field']
  },
  email: {
    type: String,
    required: ['Email is a required field']
  },
  birthday: {
    type: String,
    required: ['Birthday is a required field']
  },
  password: {
    type: String,
    required: ['Password is a required field']
  },
  confirmation_password: {
    type: String,
    required: ['Confirmation password is a required field']
  }
});

module.exports = mongoose.model('User', userSchema);