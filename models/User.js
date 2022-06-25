const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  handle: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  color: {
    type: String,
    default: 'dark',
    enum: ['dark', 'light']
  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private']
  },
  userType: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'root']
  }
})

module.exports = mongoose.model('User', UserSchema)
