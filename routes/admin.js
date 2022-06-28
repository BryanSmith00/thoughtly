const express = require('express')
const router = express.Router()
const { ensureAdminAuth } = require('../middleware/auth')

const User = require('../models/User')

// @desc    Show edit page for user account
// @route   GET /admin/edit/:id
router.get('/edit/:id', ensureAdminAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).lean()

    if (!user) {
      return res.render('error/404')
    }

    if (req.user.userType === 0) {
      res.redirect('/')
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
router.put('/:id', ensureAdminAuth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id).lean()

    if (!user) {
      return res.render('error/404')
    }

    if (req.user.id === 'user') {
      res.redirect('/')
    } else {
      user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
      })

      res.redirect('/')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Delete user account
// @route   DELETE /admin/:id
router.delete('/:id', ensureAdminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean()

    if (!user) {
      return res.render('error/404')
    }

    if (req.user.id === 'user') {
      res.redirect('/')
    } else {
      await User.deleteOne({ _id: req.params.id })
      res.redirect('/')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

module.exports = router
