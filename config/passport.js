const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    { User } = require('../models/index')

passport.serializeUser(function (user_id, done) {
    // console.log('serialize user id', user_id.username)
    done(null, user_id)
})

passport.deserializeUser(function (user_id, done) {
    console.log('deserialize', user_id.username)
    User.findById(user_id.id)
    .then(function (res) {
        done(null, res)
    })
    .catch(err => {
        console.log(err)
    })
})

passport.use('login', new LocalStrategy(
    (username, password, done) => {
    console.log('strategy ran')
        User.findOne({
            where: {
                username: username
            }
        })
        .then((user) => {
            if (!user) {
                return done(null, false)
            }
            bcrypt.compare(password, user.password)
            .then((auth) => {
                if (!auth) return done(null, false)
                done(null, user)
            })
        })
    }
))
