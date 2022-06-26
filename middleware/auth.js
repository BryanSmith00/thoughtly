module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  },

  ensureUserAuth: function (req, res, next) {
    if (req.isAuthenticated() && req.user.userType === 'user') {
      return next()
    } else {
      res.redirect('/')
    }
  },

  ensureAdminAuth: function (req, res, next) {
    if (req.isAuthenticated() && !(req.user.userType === 'user')) {
      return next()
    } else {
      res.redirect('/')
    }
  },

  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/home')
    } else {
      return next()
    }
  }
}
