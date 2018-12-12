const { User, Game } = require('../models/index')

module.exports = {
	isLoggedIn: (req, res, next) => {
		if (!req.isAuthenticated()) {
			req.flash('error', 'You need to be logged in to do that')
			return res.redirect('/')
		} else {
			return next()
		}
	},
	addScoreDB: (req, res, next, user) => {
		console.log('user_id', user)
		Game.increment({
			score: 5
		}, { where: { id:  1 }})
	},
	validate: (req, res, next) => {
		const code = req.body.code
		if (code.length < 10) {
			req.flash('error', 'Please enter a valid funtion')
			return false
		}
		next()
	},
	createGame: (req, res, next) => {
		let user_id = req.user.dataValues.id
		if (req.params.gameId) return next()
		Game.create({ userId: user_id, active: true })
			.then(game => {
				let gameId = game.dataValues.id
				return res.redirect('/game/' + gameId + '/challenge/1')
			})
	}
}