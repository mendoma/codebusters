require('dotenv').config()
require('./config/passport')
const express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    favicon = require('serve-favicon'),
    path = require('path'),
    flash = require('connect-flash'),
    passport = require('passport')

const app = express()
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))

// Port to listen on
const PORT = process.env.PORT || 8080

// Static directory for public
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))

// Use handlebars
app.engine('handlebars', hbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(flash())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.secret,
    maxAge: 6000,
    resave: false,
    saveUninitialized: false,
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Globals
app.use((req, res, next) => {
    // currentUser
    res.locals.currentUser = req.user

    // flash messages
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})

// Routes
const indexRoutes = require('./controllers/index')
const indexUsers = require('./controllers/users')
const apiRoutes = require('./controllers/api')

app.use(indexUsers)
app.use(apiRoutes)
app.use(indexRoutes)

// Start server
app.listen(PORT, () => {
    console.log(`The codebusters app is running on http://localhost:${PORT}`)
})

module.exports = app