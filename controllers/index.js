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
	console.log(result[0])
	res.render('challenge', { data: result[0], gameId: req.params.gameId })
})

// // GET code challenge1 page
// router.get('/game/:gameId/challenge1', middleware.isLoggedIn, (req, res) => {
// 	console.log('data', data)
// 	res.render('challenge1', { gameId: req.params.gameId, data: data })
// })

// // GET code challenge2 page
// router.get('/challenge/:gameId/challenge2', middleware.isLoggedIn, (req, res) => {
// 	res.render('challenge2', { gameId: req.params.gameId })
// })

// // GET code challenge3 page
// router.get('/challenge/:gameId/challenge3', middleware.isLoggedIn, (req, res) => {
// 	res.render('challenge3', { gameId: req.params.gameId })
// })

// // GET code challenge4 page
// router.get('/challenge/:gameId/challenge4', middleware.isLoggedIn, (req, res) => {
// 	res.render('challenge4', { gameId: req.params.gameId })
// })

// router.get('/challenge/:gameId/challenge5', middleware.isLoggedIn, (req, res) => {
// 	res.render('challenge5', { gameId: req.params.gameId })
// })
 
// router.get('/challenge/:gameId/challenge6', middleware.isLoggedIn, (req, res) => {
// 	res.render('challenge6', { gameId: req.params.gameId })
// })
 
// router.get('/challenge/:gameId/challenge7', middleware.isLoggedIn, (req, res) => {
// 	res.render('challenge7', { gameId: req.params.gameId })
// })
 
// router.get('/challenge/:gameId/challenge8', middleware.isLoggedIn, (req, res) => {
// 	res.render('challenge8', { gameId: req.params.gameId })
// })
 
// router.get('/challenge/:gameId/challenge9', middleware.isLoggedIn, (req, res) => {
// 	res.render('challenge9', { gameId: req.params.gameId })
// })
 
// router.get('/challenge/:gameId/challenge10', middleware.isLoggedIn, (req, res) => {
// 	res.render('challenge10', { gameId: req.params.gameId })
// })

// Catch all
router.get('*', (req, res) => {
	req.flash('error', 'Ooooops nothing to see here!')
	res.redirect('/')
})

module.exports = router