// Para colocar en paginas que cambien cuando el usuario está logueado
function authMiddleware(req, res, next) {
    if (req.session.authenticatedUser) {
        next();
    } else {
        req.session.redirectUrl = req.originalUrl;
        res.redirect('/login');
    }
}
module.exports = authMiddleware;
