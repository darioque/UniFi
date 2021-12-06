// Para colocar en paginas que cambien cuando el usuario está logueado
function authMiddleware(req, res, next) {
    if (req.session.authenticatedUser) {
        next();
    } else {
        res.send('This site is only for users');
    }
}
module.exports = authMiddleware;
