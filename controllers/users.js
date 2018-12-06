const express = require('express'),
	passport = require('passport'),
	middleware = require('../middleware/middleware'),
	{ User } = require('../models/index'),
	router = express.Router()

// GET login page
router.get('/users/login', (req, res) => {
	res.render('login')
})

// GET user home page
router.get('/users/home', middleware.isLoggedIn, (req, res) => {
	console.log(req.isAuthenticated)
	res.render('home')
})

// GET register page
router.get('/users/register', (req, res) => {
	res.render('register')
})

// POST register
router.post('/users/register', (req, res) => {
	const data = {
		fullname: req.body.fullname,
		username: req.body.username,
		password: req.body.password
	}
	User.findOne({
		where: {
			username: data.username
		}
	})
		.then(user => {
			if (user) {
				console.log('Username already exists')
				req.flash('error', 'Username already exists')
				return res.redirect('/')
			} else {
				User.create({
					fullname: data.fullname,
					username: data.username,
					password: data.password
				})
					.then(res => {
						if (!res) return req.flash('Failed to create account')
						return res
					})
			}
			req.login(req.body.id, err => {
				if (err) {
					req.flash('success', 'Welcome ' + req.body.fullname + '. You have successfully created your account. Please login!')
				} else {
					req.flash('success', 'Please login')
				}
			})
			res.redirect('/')
		})
		.catch(err => {
			req.flash('error', err)
		})
})

router.post('/users/login', (req, res, next) => {
	passport.authenticate('login', (err, user, info) => {
		console.log('login', err)
		console.log('logininfo', info)
		if (err) {
			req.flash('error', err)
			res.redirect('/')
		}
		if (!user) {
			console.log(user)
			req.flash('error', 'Username or password is incorrect')
			return res.redirect('/')
		}
		req.logIn(user, function(err) {
			if (err) {
				req.flash('error', err)
				return res.redirect('/')
			}
			req.flash('success', 'Welcome ' + user.fullname)
			return res.redirect('/challenge/' + gameId + '/challenge1')
		})
	})(req, res, next)
})

router.get('/users/code', (req, res, next) => {
	return res.redirect('/challenge/' + gameId + '/challenge1')
})

// Logout session
router.get('/users/logout', (req, res) => {
	req.flash('success', 'You have logged out successfully')
	req.logout()
	res.redirect('/')
})

module.exports = router