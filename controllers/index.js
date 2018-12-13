const express = require('express'),
	middleware = require('../middleware/middleware'),
	data = require('../config/data'),
	{ User, Game, Answer } = require('../models/index')

const router = express.Router()

// GET home page
router.get('/', (req, res, next) => {
	console.log('logged in?', req.isAuthenticated())
	Game.findAll({
		limit: 10,
		include: [
			User
		],
		order: [[ 'total_score', 'DESC' ]]
	})
		.then(result => {
			result.forEach(game => {
				let highScore = game.dataValues.total_score
				let playerName = game.dataValues.user.dataValues.fullname
				return highScore, playerName
			})
			return res.render('index', { game: result })
		})
		.catch(err => {
			console.log(err)
			req.flash('error', err)
			return res.redirect('/')
		})
})

// GET code challenge1 page
router.get('/game/:gameId/challenge/:id', middleware.isLoggedIn, (req, res) => {
	const gameId = parseInt(req.params.gameId)
	const currentId = parseInt(req.params.id)
	Answer.create({
		score: 0,
		gameId: gameId
	})

	if (currentId === 11) {
		Answer.findAll({
			where: {
				gameId: gameId
			},
			include: [
				Game
			]
		})
			.then(result => {
				console.log('skip result', result)
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
		const result = data.filter(q => {
			if (q.id === parseInt(req.params.id)) {
				return q
			}
		})
		res.render('challenge', { data: result[0], gameId: req.params.gameId })
	}
})

// Catch all
router.get('*', (req, res) => {
	req.flash('error', 'Ooooops nothing to see here!')
	res.redirect('/')
})

module.exports = router