const express = require('express'),
	middleware = require('../middleware/middleware'),
	data = require('../config/data'),
	{ User, Game } = require('../models/index')

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
})

// GET code challenge1 page
router.get('/game/:gameId/challenge/:id', middleware.isLoggedIn, (req, res) => {
	const result = data.filter(q => {
		if (q.id === parseInt(req.params.id)) {
			return q
		}
	})
	res.render('challenge', { data: result[0], gameId: req.params.gameId })
})

// Catch all
router.get('*', (req, res) => {
	req.flash('error', 'Ooooops nothing to see here!')
	res.redirect('/')
})

module.exports = router