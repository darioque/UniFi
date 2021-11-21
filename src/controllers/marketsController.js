let assetList = [
    {
        name: 'bitcoin',
        type: 'cryptocurrencies',
        ticker: 'BTC',
        price: '60,000',
        logo: '/img/btc_logo.png' 
    },
    {
        name: 'ethereum',
        type: 'cryptocurrencies',
        ticker: 'ETH',
        price: '60,000',
        logo: '/img/eth_logo.png' 
    },
    {
        name: 'amazon',
        type: 'stocks',
        ticker: 'AMZN',
        price: '60,000',
        logo: '/img/amzn_logo.png' 
    },
    {
        name: 'tesla',
        type: 'stocks',
        ticker: 'TSLA',
        price: '60,000',
        logo: '/img/tsla_logo.png' 
    },
    {
        name: 'google',
        type: 'stocks',
        ticker: 'GOOGL',
        price: '60,000',
        logo: '/img/googl_logo.png'  
    },
];
const marketsController = {
    markets: function (req, res) {
        res.render('markets', {
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
        res.render(String('productDetail2'), {
            pageTitle: assetRequested + " Details",
            asset: assetList.find(asset => asset.name === assetRequested || asset.ticker.toLowerCase() === assetRequested),
        });
    },
    tradeConfirmation: function(req, res) {
        res.render('tradeConfirmation')
    }

};

module.exports = marketsController; 