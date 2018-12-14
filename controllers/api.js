const express = require('express'),
	{ VM } = require('vm2'),
	vm = new VM(),
	code = require('../code/code'),
	{ User, Game, Answer } = require('../models/index')

const router = express.Router()

// Game code
router.post('/api/:gameId/challenge/:id', (req, res, next) => {
	const currentId = parseInt(req.params.id - 1)
	const gameId = req.params.gameId

	const challenge = code.filter(obj => {
		if (obj.id === parseInt(currentId)) {
			return obj
		}
	})

	try {
		var input = req.body.code
		var answer = challenge[0].code()
		var result = vm.run(input)
		var compare = result === answer
		console.log('new result', result)
	} catch (err) {
		console.log('Failed to execute script.', err)
	}

	if (currentId === 10) {
		if (compare) {
			Answer.create({
				score: 5,
				code: input,
				gameId: gameId
			})
		}
		if (!compare) {
			Answer.create({
				score: 0,
				code: input,
				gameId: gameId
			})
		}
		Answer.findAll({
			where: { gameId: gameId },
			include: [
				Game
			]
		})
			.then(result => {
				const game = result[0].dataValues.gameId
				const points = result.map(points => points.dataValues.score)
					.reduce((a, b) => a + b, 0)
				Game.update({
					total_score: points,
				}, { where: { id: game }})
				req.flash('success', `Thank you for playing ${req.user.fullname}`)
				return res.redirect('/')
			})
	}
	
	if (currentId !== 10) {
		if (compare) {
			Answer.create({
				score: 5,
				code: input,
				gameId: req.params.gameId
			})
			if (compare) req.flash('success', 'Answer submitted correctly')
			if (!compare) req.flash('error', 'Answer submitted incorrectly')
			return res.redirect('/game/' + req.params.gameId + '/challenge/' + req.params.id)
		}
		if (!compare) {
			Answer.create({
				score: 0,
				code: input,
				gameId: req.params.gameId
			})
			if (compare) req.flash('success', 'Answer submitted correctly')
			if (!compare) req.flash('error', 'Answer submitted incorrectly')
			return res.redirect('/game/' + req.params.gameId + '/challenge/' + req.params.id)
		}
	}
})

module.exports = router