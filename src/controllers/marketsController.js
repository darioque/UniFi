const fs = require("fs")
const stockListJSON = fs.readFileSync("../data/stocksList.json")
const cryptoListJSON = fs.readFileSync("../data/cryptocurrenciesList.json")
const stockList = JSON.parse(stockListJSON)
const cryptoList = JSON.parse(cryptoListJSON)

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
            assetList: marketType === 'cryptocurrencies'? cryptoList: stockList,
        });
    },

    detail: function (req, res) {
        let marketType = req.params.marketType
        let assetRequested = req.params.asset;
        let assetList = marketType === 'cryptocurrencies'? cryptoList: stockList
        res.render(('products/productDetail'), {
            pageTitle: assetRequested + " Details",
            asset: assetList.find(asset => asset.name === assetRequested || asset.ticker.toLowerCase() === assetRequested || asset.id === assetRequested),
        });
    },
    
    tradeConfirmation: function(req, res) {
        res.render('products/tradeConfirmation')
    }

};

module.exports = marketsController; 