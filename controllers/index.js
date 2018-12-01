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

router.get('/challenge5', (req, res) => {
    res.render('challenge5')
 })
 
 router.get('/challenge6', (req, res) => {
    res.render('challenge6')
 })
 
 router.get('/challenge7', (req, res) => {
    res.render('challenge7')
 })
 
 router.get('/challenge8', (req, res) => {
    res.render('challenge8')
 })
 
 router.get('/challenge9', (req, res) => {
    res.render('challenge9')
 })
 
 router.get('/challenge10', (req, res) => {
    res.render('challenge10')
 })

// Catch all
router.get('*', (req, res) => {
    res.send('Ooooops nothing to see here!')
})

module.exports = router