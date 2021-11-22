const mainController = {
    index: function (req, res) {
        res.render('index', {
            pageTitle: "Home - UniFi"
        });
    },
    login: function (req, res) {
        res.render('login', {
            pageTitle: "Log in"
        });
    },
    register: function (req, res) {
        res.render('register', {
            pageTitle: "Register"
        });
    },

};

module.exports = mainController; 