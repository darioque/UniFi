function userLoggedMiddleware (req, res, next) {
    if (req.session.authenticatedUser) {
        res.locals.authenticatedUser = req.session.authenticatedUser
    }
    next()
}

module.exports = userLoggedMiddleware