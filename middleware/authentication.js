const middleware = {}

// Require login
middleware.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}
	req.flash('error', 'You must login to do that')
	res.redirect('/users/login')
}

middleware.destroySession = (req, res, next) => {
	req.logout()
	req.session.destroy()
	res.redirect('/')
}

module.exports = middleware