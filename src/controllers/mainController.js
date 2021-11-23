const fs = require("fs")
const stockListJSON = fs.readFileSync("../data/stocksList.json")
const cryptoListJSON = fs.readFileSync("../data/cryptocurrenciesList.json")
const stockList = JSON.parse(stockListJSON)
const cryptoList = JSON.parse(cryptoListJSON)


const mainController = {
    index: function (req, res) {
        res.render('home/index', {
            pageTitle: "UniFi - Home",
            cryptoList: cryptoList,
            stockList: stockList,
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