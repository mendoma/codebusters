const jwt = require('jsonwebtoken'),
	middleware = {}

// Require login
middleware.isLoggedIn = (req, res, next) => {
	const token = req.headers
	console.log(token)
	if (token) {
		jwt.verify(token, process.env.secret, (err, decod) => {
			if (err) {
				res.status(403).json({
					message: "Wrong Token"
				})
			} else {
				req.decoded = decod;
				next()
			}
		})
	} else {
		req.flash('error', 'You must login to do that')
		res.status(403).json({
			message: "No Token"
		})
	}

}

middleware.destroySession = (req, res, next) => {
	req.logout()
	req.session.destroy()
	res.redirect('/')
}

module.exports = middleware