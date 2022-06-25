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

// @desc    Update user account
// @route   PUT /admin/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id).lean()

    if (!user) {
      return res.render('error/404')
    }

    if (req.user.id === "user") {
      res.redirect('/home')
    } else {
      user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/home')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Delete user account
// @route   DELETE /admin/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean()

    if (!user) {
      return res.render('error/404')
    }

    if (req.user.id === "user") {
      res.redirect('/home')
    } else {
      await User.deleteOne({ _id: req.params.id })
      res.redirect('/home')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

module.exports = router
