const middleware = {}

// Require login
middleware.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'You need to be logged in to do that')
		return res.redirect('/')
	} else {
		req.flash('success', 'You are now logged in')
		next()
	}
}

// Validate user code input
middleware.validate = (req, res, next) => {
	console.log(req)
}
module.exports = middleware