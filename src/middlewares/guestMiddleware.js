function guestMiddleware (req, res, next) {
    if (!req.session.authenticatedUser) {
        next()
    } else {
        res.send("This site is only for guests");

    }
}
module.exports = guestMiddleware