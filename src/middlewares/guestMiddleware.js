// para colocar en paginas que cambien cuando el usuario NO está logueado
function guestMiddleware(req, res, next) {
    if (!req.session.authenticatedUser) {
        next();
    } else {
        res.redirect('/')
    }
}
module.exports = guestMiddleware;
