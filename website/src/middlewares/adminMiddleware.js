// Para colocar en paginas que cambien cuando el usuario que está logueado es administrador
function adminMiddleware(req, res, next) {
    if (req.session.authenticatedUser && req.session.authenticatedUser.admin) {
        next();
    } else {
        req.session.redirectUrl = req.originalUrl;
        res.redirect("/login");
    }
}
module.exports = adminMiddleware;
