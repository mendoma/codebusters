const express = require('express')

const router = express.Router()

// GET home page
router.get('/users', (req, res) => {
    res.send('In construction')
})

module.exports = router