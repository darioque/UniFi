// mantiene los datos del usuario para login en caso de haber una cookie que corresponda
const userService = require('../services/users')
function rememberMeMiddleware (req, res, next) {
    if (req.cookies.rememberMe) {
        req.session.rememberMe = userService.findUserByPk(parseInt(req.cookies.rememberMe));
    }
    next()
}

module.exports = rememberMeMiddleware