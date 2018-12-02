const express = require('express'),
    passport = require('passport'),
    middleware = require('../middleware/authentication'),
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
                        username: data.username,
                        password: data.password
                    })
                    .then(res => {
                        if (!res) return req.flash('Failed to create account')
                        console.log('res:', res)
                        return res
                    })
            }
            req.login(req.body.id, err => {
                if (err) {
                    req.flash('success', 'Successfully created account. Please login')
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

// Login
router.post('/users/login', passport.authenticate('login', {
    successRedirect: '/challenge1',
    successMessage: 'You have logged in',
    failureRedirect: '/',
    failureFlash: true
}))

// Logout session
router.get('/users/logout', (req, res) => {
    req.flash('success', 'You have logged out successfully')
    req.logout()
    res.redirect('/')
})

module.exports = router