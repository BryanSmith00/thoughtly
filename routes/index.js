const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const thought = require('../models/Thought');

// @desc    Login page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});


// @desc    Home page
// @route   GET /home
router.get('/home', ensureAuth, async(req, res) => {
  try {
    // Fetches all thoughts that are by the logged in user
    const thoughts = await thought.find({ user: req.user.id }).lean();

    res.render('home', {
      name: req.user.firstName,
      handle: req.user.handle,
      pic: req.user.image,
      thoughts
    });

  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});


// @desc    User profile
// @route   GET /profile
router.get('/profile', ensureAuth, async(req, res) => {
  try {
    // Fetches all thoughts that are by the logged in user
    const thoughts = await thought.find({ user: req.user.id }).lean();
    res.render('profile', { 
      name: req.user.firstName,
      thoughts
    });

  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;