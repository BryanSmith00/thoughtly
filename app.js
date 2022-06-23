const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const favicon = require('serve-favicon')

// Load env config file
dotenv.config({ path: './config/config.env' })

const PORT = process.env.PORT || 3000

// Passport configuration for google oauth2.0
require('./config/passport')(passport)

connectDB()

// Establishes the app and port to listen on
const app = express()

// Allows us to parse post form data from the response body
app.use(express.urlencoded({ extended: false }))

// Method override, allows us to use other http keywords such as PUT
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// Log connecions only when in dev
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Helper file to format dates using moment js
const { formatDate } = require('./helpers/hbs')

// Templating engine right now is express-handle1ars
app.engine('.hbs', exphbs.engine({ helpers: { formatDate }, defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

// Express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set express global variable
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// Static folder
app.use(express.static(path.join(__dirname, '/public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/thoughts', require('./routes/thoughts'))

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode on http://localhost:${PORT}/`)
})
