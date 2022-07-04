const mongoose = require('mongoose')

const ThoughtSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  reposts: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Thought', ThoughtSchema)
