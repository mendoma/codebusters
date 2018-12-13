const express = require('express'),
	code = require('../code/code'),
	vm = require('vm'),
	{ User, Game, Answer } = require('../models/index')

const router = express.Router()

// Game code
router.post('/api/:gameId/challenge/:id', (req, res, next) => {
	const currentId = parseInt(req.params.id - 1)

	const challenge = code.filter(obj => {
		if (obj.id === parseInt(currentId)) {
			return obj
		}
	})

	const gameId = req.params.gameId
	const input = req.body.code
	const answer = challenge[0].code()
	const result = vm.runInNewContext(input)
	const compare = result === answer

	console.log(answer)

	if (currentId === 10) {
		if (compare) {
			Answer.create({
				score: 5,
				code: input,
				gameId: gameId
			})
		} else {
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
	} else {
		if (compare) {
			Answer.create({
				score: 5,
				code: input,
				gameId: req.params.gameId
			})
			req.flash('success', 'Answer submitted correctly? ' + compare)
			res.redirect('/game/' + req.params.gameId + '/challenge/' + req.params.id)
		} else {
			Answer.create({
				score: 0,
				code: input,
				gameId: req.params.gameId
			})
			req.flash('success', 'Answer submitted correctly? ' + compare)
			res.redirect('/game/' + req.params.gameId + '/challenge/' + req.params.id)
		}
	}
})

module.exports = router