const express = require('express'),
    passport = require('passport'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    middleware = require('../middleware/authentication'),
    {
        User,
        Game
    } = require('../models/index'),
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
// router.post('/users/login', passport.authenticate('local', {
//     successMessage: true,
//     successRedirect: '/users/home',
//     failureMessage: true,
//     failureRedirect: '/users/login'
// }))
router.post('/users/login', function (req, res, next) {

    passport.authenticate('local', {
            failureFlash: true,
            failureRedirect: '/users/login',
            session: false
        }, (err, user, info) => {
            console.log('new strategy 1st', err)
            if (err || !user) {
                return res.status(400).json({
                    message: info ? info.message : 'Login failed',
                    user: user
                })
            }
            req.login(user, {
                session: false
            }, (err) => {
                console.log('new login strategy', user.username)
                if (err) return res.send(err)
                bcrypt.compare(req.body.password, user.password)
                    .then(auth => {
                        if (!auth) {
                            return res.redirect('/users/login')
                        }
                        const token = jwt.sign({
                            id: user.id,
                            username: user.username
                        }, process.env.secret, {
                            expiresIn: 1200
                        })
                console.log('token created:', token)
                res.cookie('Authorization', token).redirect('/users/home')
            })
            })
        })
        (req, res)
})

// Logout session
router.get('/users/logout', middleware.destroySession)

module.exports = router