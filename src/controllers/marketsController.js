const fs = require("fs")
const stockListJSON = fs.readFileSync("../data/stocksList.json")
const cryptoListJSON = fs.readFileSync("../data/cryptocurrenciesList.json")
const stockList = JSON.parse(stockListJSON)
const cryptoList = JSON.parse(cryptoListJSON)

// ordena todos los activos con respecto a su cambio de precio (mayor a menor)
let mainGainers = stockList.concat(cryptoList).sort(function (a, b) {
  if (a.change < b.change) {
    return 1;
  }
  if (a.change > b.change) {
    return -1;
  }
  return 0;
});

// ordena todos los activos con respecto a su cambio de precio (menor a mayor)
let mainLosers = [...mainGainers].reverse()


const marketsController = {

    markets: function (req, res) {
        res.render('products/markets', {
            pageTitle: "UniFi - Markets",
            cryptoList: cryptoList,
            stockList: stockList,
            mainGainers: mainGainers,
            mainLosers: mainLosers,
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
            pageTitle: assetRequested + " - Details",
            asset: assetList.find(asset => asset.name === assetRequested || asset.ticker.toLowerCase() === assetRequested || asset.id === assetRequested),
        });
    },
    
    search: function (req, res) {
        let marketType = req.params.marketType;
        let assetList = marketType === 'cryptocurrencies'? cryptoList: stockList;
        let search = req.body.search;
        res.redirect('/' + 'markets' + '/' + marketType + '/' + search);
    },
};

module.exports = marketsController; 