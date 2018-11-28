const express = require('express')

const router = express.Router()

// GET home page
router.get('/', (req, res) => {
    console.log(req.user)
    console.log(req.isAuthenticated())
    res.render('index')
})

// GET code challenge1 page
router.get('/challenge1', (req, res) => {
    res.render('challenge1')
})

// GET code challenge2 page
router.get('/challenge2', (req, res) => {
    res.render('challenge2')
})

// GET code challenge3 page
router.get('/challenge3', (req, res) => {
    res.render('challenge3')
})

// GET code challenge4 page
router.get('/challenge4', (req, res) => {
    res.render('challenge4')
})

// Catch all
router.get('*', (req, res) => {
    res.send('Ooooops nothing to see here!')
})

module.exports = router