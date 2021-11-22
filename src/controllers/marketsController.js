const fs = require("fs")
const assetListJSON = fs.readFileSync("../data/productList.json")
const assetList = JSON.parse(assetListJSON)

const marketsController = {

    markets: function (req, res) {
        res.render('products/markets', {
            pageTitle: "Markets"
        });
    },

    list: function (req, res) {
        let marketType = req.params.marketType
        res.render('products/productList', {
            marketType: marketType,
            pageTitle: "Invest in UniFi - " + marketType,
            assetList: assetList,
        });
    },

    detail: function (req, res) {
        let assetRequested = req.params.asset;
        res.render(('products/productDetail'), {
            pageTitle: assetRequested + " Details",
            asset: assetList.find(asset => asset.name === assetRequested || asset.ticker.toLowerCase() === assetRequested),
        });
    },
    
    tradeConfirmation: function(req, res) {
        res.render('products/tradeConfirmation')
    }

};

module.exports = marketsController; 