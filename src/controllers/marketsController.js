const fs = require("fs")
const assetListJSON = fs.readFileSync("../data/productList.json")
const assetList = JSON.parse(assetListJSON)

const marketsController = {

    markets: function (req, res) {
        res.render('products/markets', {
            pageTitle: "Markets"
        });
    },

    type: function (req, res) {
        let marketType = req.params.marketType
        res.render(String(marketType + 'List'), {
            pageTitle: "Invest in UniFi - " + marketType,
            assetList: assetList,
        });
    },

    detail: function (req, res) {
        let assetRequested = req.params.asset;
        res.render(('products/productDetail2'), {
            pageTitle: assetRequested + " Details",
            asset: assetList.find(asset => asset.name === assetRequested || asset.ticker.toLowerCase() === assetRequested),
        });
    },
    
    tradeConfirmation: function(req, res) {
        res.render('products/tradeConfirmation')
    }

};

module.exports = marketsController; 