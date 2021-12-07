// mantiene al usuario logueado en caso de haber una cookie que corresponda
const userService = require('../services/users')
function rememberMeMiddleware (req, res, next) {
    next()
    if (req.cookies.rememberMe && !req.session.authenticatedUser) {
        req.session.authenticatedUser= userService.findUser(
            'email', req.cookies.rememberMe
        );
    }
}

module.exports = rememberMeMiddleware