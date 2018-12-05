const express = require('express'),
   code = require('../code/code'),
   vm = require('vm'),
   middleware = require('../middleware/middleware'),
   { User, Game, Answer } = require('../models/index')

const router = express.Router()

// Test code
router.post('/api/challenge1', (req, res) => {
   const user_id = req.user.dataValues.id
   const input = req.body.code
   const addAnswer = code.addNumbers(2, 2)
   let result = vm.runInNewContext(input)
   let compare = result === addAnswer
   console.log('correct:', compare)
   console.log('reqeust:', res)
   if (compare) {
      Answer.create({
         score: 5,
         code: input,
         gameId: gameId
      }, { where: { gameId: gameId }})
   }
   req.flash('success', 'Answer submitted')
   res.redirect('/challenge/' + gameId + '/challenge2')
})

router.post('/api/challenge2', (req, res) => {
   const input = req.body.code
   const fizzBuzz = code.fizzBuzz(50)
   let result = vm.runInNewContext(input)
   let compare = result === fizzBuzz
   if (compare) {
      Answer.create({
         score: 5,
         code: input,
         gameId: gameId
      }, { where: { gameId: gameId }})
   }
   req.flash('success', 'Answer submitted')
   res.redirect('/challenge/' + gameId + '/challenge3')
})

router.post('/api/challenge3', (req, res) => {
   const input = req.body.code
   const reverse = code.reverse("NodeJS")
   let result = vm.runInNewContext(input)
   let compare = result === reverse
   if (compare) {
      Answer.create({
         score: 5,
         code: input,
         gameId: gameId
      }, { where: { gameId: gameId }})
   }
   req.flash('success', 'Answer submitted')
   res.redirect('/challenge/' + gameId + '/challenge4')
})

router.post('/api/challenge4', (req, res) => {
   const input = req.body.code
   const missingNum = code.missingNum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20])
   let result = vm.runInNewContext(input)
   let compare = result === missingNum
   if (compare) {
      Answer.create({
         score: 5,
         code: input,
         gameId: gameId
      }, { where: { gameId: gameId }})
   }
   req.flash('success', 'Answer submitted')
   res.redirect('/challenge/' + gameId + '/challenge5')
})

router.post('/api/challenge5', (req, res) => {
   const input = req.body.code
   const oddNum = code.oddNum()
   let result = vm.runInNewContext(input)
   let compare = result === oddNum
   if (compare) {
      Answer.create({
         score: 5,
         code: input,
         gameId: gameId
      }, { where: { gameId: gameId }})
   }
   req.flash('success', 'Answer submitted')
   res.redirect('/challenge/' + gameId + '/challenge6')
})

router.post('/api/challenge6', (req, res) => {
   const input = req.body.code
   const primeCheck = code.primeCheck()
   let result = vm.runInNewContext(input)
   let compare = result === primeCheck
   if (compare) {
      Answer.create({
         score: 5,
         code: input,
         gameId: gameId
      }, { where: { gameId: gameId }})
   }
   req.flash('success', 'Answer submitted')
   res.redirect('/challenge/' + gameId + '/challenge7')
})

router.post('/api/challenge7', (req, res) => {
   const input = req.body.code
   const bubblesort = code.bubblesort()
   let result = vm.runInNewContext(input)
   let compare = result === bubblesort
   if (compare) {
      Answer.create({
         score: 5,
         code: input,
         gameId: gameId
      }, { where: { gameId: gameId }})
   }
   req.flash('success', 'Answer submitted')
   res.redirect('/challenge/' + gameId + '/challenge8')
})

router.post('/api/challenge8', (req, res) => {
   const input = req.body.code
   const ArrayAdditionI = code.ArrayAdditionI()
   let result = vm.runInNewContext(input)
   let compare = result === ArrayAdditionI
   if (compare) {
      Answer.create({
         score: 5,
         code: input,
         gameId: gameId
      }, { where: { gameId: gameId }})
   }
   req.flash('success', 'Answer submitted')
   res.redirect('/challenge/' + gameId + '/challenge9')
})

router.post('/api/challenge9', (req, res) => {
   const input = req.body.code
   const simple_clock_angle = code.simple_clock_angle()
   let result = vm.runInNewContext(input)
   let compare = result === simple_clock_angle
   if (compare) {
      Answer.create({
         score: 5,
         code: input,
         gameId: gameId
      }, { where: { gameId: gameId }})
   }
   req.flash('success', 'Answer submitted')
   res.redirect('/challenge/' + gameId + '/challenge10')
})

router.post('/api/challenge10', (req, res) => {
   const input = req.body.code
   const lucky_sevens = code.lucky_sevens()
   let result = vm.runInNewContext(input)
   let compare = result === lucky_sevens
   if (compare) {
      Answer.create({
         score: 5,
         code: input,
         gameId: gameId
      }, { where: { gameId: gameId }})
   }
   req.flash('success', 'Code challenge completed!')
   res.redirect('/')
})

module.exports = router