const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Thought = require('../models/Thought')

// @desc    Login page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', { layout: 'login' })
})

// @desc    Home page
// @route   GET /home
router.get('/home', ensureAuth, async (req, res) => {
  try {
    // Fetches all thoughts that are by the logged in user
    const thoughts = await Thought.find({ user: req.user.id, status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()
    // console.log(thoughts);
    res.render('home', { thoughts })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    User profile
// @route   GET /profile
router.get('/profile', ensureAuth, async (req, res) => {
  try {
    // Fetches all thoughts that are by the logged in user
    const thoughts = await Thought.find({ user: req.user.id }).lean()
    res.render('profile', {
      name: req.user.firstName,
      thoughts
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router
