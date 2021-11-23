const fs = require("fs")
const assetListJSON = fs.readFileSync("../data/cryptocurrenciesList.json")
const assetList = JSON.parse(assetListJSON)


const productController = {
    create: function (req, res) {
        res.render('products/createProduct', {
            pageTitle: "Create Product - UniFi",
            assetList: assetList,
        });
    },
    update: function (req, res) {
        res.render('products/upgradeProduct', {
            pageTitle: "Upgrade Product - UniFi"
        });
    },
    delete: function (req, res) {
        res.render('products/deleteProduct', {
            pageTitle: "Delete Product - UniFi"
        });
    },
};

module.exports = productController;