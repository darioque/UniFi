const fs = require("fs")
const assetListJSON = fs.readFileSync("../data/productList.json")
const assetList = JSON.parse(assetListJSON)


const mainController = {
    index: function (req, res) {
        res.render('home/index', {
            pageTitle: "Home - UniFi",
            assetList: assetList,
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