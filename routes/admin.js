const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const User = require('../models/User')

// @desc    Show edit page for user account
// @route   GET /admin/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).lean()

    if (!user) {
      return res.render('error/404')
    }

    if (req.user.userType === 0) {
      res.redirect('/home')
    } else {
      res.render('admin/editUser', { user })
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// Needs updated =---------------------------------------------------------------=

/*
// @desc    Update story
// @route   PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
      let story = await Story.findById(req.params.id).lean()

      if (!story) {
        return res.render('error/404')
      }

      if (story.user != req.user.id) {
        res.redirect('/stories')
      } else {
        story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        })

        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

//Needs updated =---------------------------------------------------------------=

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
*/
module.exports = router
