require('dotenv').config()
const express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    {
        User,
        Game
    } = require('./models/index')

const app = express()

// Port to listen on
const PORT = process.env.PORT || 8080

// Static directory for public
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))

// Use handlebars
app.engine('handlebars', hbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.use(flash())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.secret,
    maxAge: 6000,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user_id, done) => {
    console.log('serialize:', user_id)
    done(null, user_id)
})
passport.deserializeUser((user_id, done) => {
    // console.log('deserialize:', user)
    done(null, user_id)
})
passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({
            where: {
                username: username
            }
        })
        .then(user => {
            if (!user) {
                return done(null, false, {
                    message: 'Authentication failed'
                })
            }
            if (!user.password) {
                return done(null, false, {
                    message: 'Authentication failed'
                })
            }
            return done(null, user);
        })
        .catch(err => {
            console.log('error', err)
        })
    }
))

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