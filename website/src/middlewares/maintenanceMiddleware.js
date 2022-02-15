let maintenance = false;

function onMaintenance (req, res, next) {
    if (maintenance) {
        res.render('maintenance')
    } else {
        next()
    }
}