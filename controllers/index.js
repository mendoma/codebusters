const express = require('express')

const router = express.Router()

// GET home page
router.get('/', (req, res) => {
    res.render('index')
})

router.get('*', (req, res) => {
    res.send('Ooooops nothing to see here!')
})

module.exports = router