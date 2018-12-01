const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passportJWT = require("passport-jwt"),
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt,
    bcrypt = require('bcrypt'),
    { User } = require('../models/index')

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
                    return done(null, false)
                }
                if (!user.password) {
                    return done(null, false)
                }
                return done(null, user)
            })
            .catch(err => {
                console.log('error', err)
            })
    }
))

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.secret
    },
    function (jwtPayload, done) {

        return User.findOneById(jwtPayload.id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                console.log(err)
                return done(err)
            })
    }
))