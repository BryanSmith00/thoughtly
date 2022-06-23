const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Thought = require('../models/Thought')

router.get('/add', ensureAuth, (req, res) => {
  res.render('thoughts/add')
})

router.get('/', ensureAuth, async (req, res) => {
  try {
    const thoughts = await Thought.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('thoughts/index', { thoughts })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Thought.create(req.body)
    res.redirect('/home')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

router.get('/:id', ensureAuth, async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate('user').lean()

    if (!thought) {
      return res.render('error/404')
    }
    if (thought.user._id !== req.user.id && thought.status === 'private') {
      res.render('error/404')
    } else {
      res.render('thoughts/show', { thought })
    }
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).lean()

    if (!thought) {
      return res.render('error/404')
    }

    if (thought.user !== req.user.id) {
      res.redirect('/thoughts')
    } else {
      await Thought.deleteOne({ _id: req.params.id })
      res.redirect('/home')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const thoughts = await Thought.find({
      user: req.params.userId,
      status: 'public'
    })
      .populate('user')
      .lean()

    res.render('thoughts/index', { thoughts })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router
