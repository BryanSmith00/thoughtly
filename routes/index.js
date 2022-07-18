const express = require('express')
const router = express.Router()
const { ensureAuth, ensureUserAuth, ensureGuest } = require('../middleware/auth')

const Thought = require('../models/Thought')
const User = require('../models/User')

// @desc    Login page
// @route   GET /login
router.get('/login', ensureGuest, (req, res) => {
  res.render('login', { layout: 'login' })
})

// @desc    Home page
// @route   GET /
router.get('/', ensureAuth, async (req, res) => {
  try {
    if (req.user.userType === 'user') {
      // Fetches all thoughts that are by the logged in user
      const thoughts = await Thought.find({ $or: [{ user: req.user.id }, { user: req.user.follows }] })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean()

      res.render('user/home', { thoughts })
    } else {
      const admin = req.user
      const users = await User.find().sort({ createdAt: 'desc' }).lean()
      res.render('admin/dashboard', { admin, users })
    }
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Search page
// @route   GET /search
router.get('/search', ensureAuth, async (req, res) => {
  try {
    res.render('search')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    User profile
// @route   GET /profile
router.get('/profile', ensureUserAuth, async (req, res) => {
  try {
    // Fetches all thoughts that are by the logged in user
    const thoughts = await Thought.find({ user: req.user.id }).lean()
    res.render('user/profile', {
      name: req.user.firstName,
      thoughts
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show user's profile
// @route   GET /user/:handle
router.get('/user/:handle', ensureAuth, async (req, res) => {
  try {
    // Profile of the user that is requested
    const profile = await User.findOne({ handle: req.params.handle }).lean()

    let isFollowed = false
    isFollowed = req.user.follows.includes(profile._id)

    // Grabs all the thoughts posted by the user who's profile is requested and joins them into the thoughts array
    const thoughts = await Thought.find({ user: profile }).populate('user').sort({ createdAt: 'desc' }).lean()

    if (profile.status === 'public' || req.user.follows.includes(profile._id)) {
      res.render('userProfile', { isFollowed, profile, thoughts })
    } else {
      // TODO: Remove profile injection when request follow is implemented
      res.render('denied', { profile })
    }
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Discover page
// @route   GET /discover
router.get('/discover', ensureAuth, async (req, res) => {
  try {
    res.render('discover')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    follow user
// @route   PUT /follow/:id
router.put('/follow/:id', ensureUserAuth, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id).lean()

    if (!userToFollow) {
      return res.render('error/404')
    }

    const current = await User.findById(req.user.id)

    if (!current) {
      return res.render('error/404')
    }

    if (!current.follows.includes(req.params.id)) {
      current.follows.push(req.params.id)
      await current.save()
    }

    res.redirect('back')
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    unfollow user
// @route   PUT /unfollow/:id
router.put('/unfollow/:id', ensureUserAuth, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id).lean()

    if (!userToUnfollow) {
      return res.render('error/404')
    }

    const current = await User.findById(req.user.id)

    if (!current) {
      return res.render('error/404')
    }

    if (current.follows.includes(req.params.id)) {
      current.follows.pop(req.params.id)
      await current.save()
    }

    res.redirect('back')
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

module.exports = router
