const express = require('express'),
    passport = require('passport'),
    bcrypt = require('bcrypt'),
    middleware = require('../middleware/authentication'),
    {
        User,
        Game
    } = require('../models/index'),
    router = express.Router()

// GET login page
router.get('/users/login', (req, res) => {
    console.log(req.user)
    console.log(req.isAuthenticated())
    res.render('login')
})

// GET user home page
router.get('/users/home', middleware.isLoggedIn, (req, res) => {
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
                console.log('username already taken')
                res.json('username already taken')
            } else {
                User.create({
                        username: data.username,
                        password: data.password
                    })
                    .then(res => {
                        const user_id = res.id
                        console.log('user id:', user_id)
                        console.log('user created')
                        req.login(user_id, err => {
                            console.log(err)
                            req.flash('success', 'You have created your account successfully')
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
    res.redirect('/')
})

// Login
router.post('/users/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.json(err)
        }
        if (!user) {
            console.log('bad username')
            return res.status(400).json('bad username')
        }

        if (user) {
            bcrypt.compare(req.body.password, user.password)
                .then(data => {
                    const user_id = user.id

                    if (data) {
                        console.log('user id:', user_id)
                        console.log('user logged in')
                        req.login(user_id, err => {
                            console.log(err)
                            req.flash('success', 'You have created your account successfully')
                        })
                    } else {
                        console.log('passwords do not match')
                        return next()
                    }
                })
                .catch(err => {
                    return console.log(err)
                })
            res.redirect('/')
        }
    })(req, res, next)
})

// Logout session
router.get('/users/logout', middleware.destroySession)

module.exports = router