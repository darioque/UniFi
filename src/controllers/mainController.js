const assetService = require('../services/assets')


const mainController = {
    index: function (req, res) {
        res.render('home/index', {
            pageTitle: "UniFi - Home",
            cryptoList: assetService.getCrypto(),
            stockList: assetService.getStock(),
        });
    },
    login: function (req, res) {
        res.render('users/login', {
            pageTitle: "Log in"
        });
    },
    register: function (req, res) {
        res.render('users/register', {
            pageTitle: "Register"
        });
    },

};

module.exports = mainController; 