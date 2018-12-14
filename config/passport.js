const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	bcrypt = require('bcrypt'),
	{ User, Game } = require('../models/index')

passport.serializeUser(function (user_id, done) {
	done(null, user_id)
})

passport.deserializeUser(function (user_id, done) {
	User.findById(user_id.id)
		.then(function (res) {
			done(null, res)
		})
		.catch(err => {
			req.flash('error', err)
		})
})

passport.use('login', new LocalStrategy(
	(username, password, done) => {
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
						if (!auth) {
							return done(null, false)
						}
						return done(null, user)
					})
			})
	}))