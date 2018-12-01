const express = require('express')
const code = require('../code/code')
const vm = require('vm')

const router = express.Router()

// Test code
router.post('/api/code', (req, res) => {
    const input = req.body.code
    const addAnswer = code.addNumbers(2, 2)
    let result = vm.runInNewContext(input)
    let compare = result === addAnswer
    console.log('user code:', result)
    console.log('correct answer:', addAnswer)
    console.log('correct code?', compare)
})

module.exports = router