module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/login')
    }
  },

  ensureUserAuth: function (req, res, next) {
    if (req.isAuthenticated() && req.user.userType === 'user') {
      return next()
    } else {
      res.redirect('/login')
    }
  },

  ensureAdminAuth: function (req, res, next) {
    if (req.isAuthenticated() && !(req.user.userType === 'user')) {
      return next()
    } else {
      res.redirect('/login')
    }
  },

  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/login')
    } else {
      return next()
    }
  }
}
