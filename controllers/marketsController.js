const marketsController = {
    markets: function (req, res) {
        res.render('markets', {
            pageTitle: "Markets"
        });
    },
    type: function (req, res) {
        res.render(String(req.params.marketType), {
            pageTitle: "Invest in UniFi"
        });
    },
    detail: function (req, res) {
        res.render(String('productDetail'), {
            pageTitle: "Invest in UniFi"
        });
    },

};

module.exports = marketsController; 