const assetService = require('../services/assets')

const marketsController = {
    markets: function (req, res) {
        const assetList = assetService.getAll();
        res.render("products/markets", {
            pageTitle: "UniFi - Markets",
            mainGainer: assetService.sortByGainers(assetList)[0],
            mainLoser: assetService.sortByLosers(assetList)[0],
            assetList,
        });
    },

    list: function (req, res) {
        const marketType = req.params.marketType;
        res.render("products/productList", {
            marketType,
            pageTitle: "Invest in UniFi - " + marketType,
            assetList: assetService.getAssetList(marketType),
        });
    },

    detail: function (req, res) {
        const assetRequested = req.params.asset;
        const marketType = req.params.marketType
        res.render("products/productDetail", {
            pageTitle: assetRequested + " - Details",
            asset: assetService.findAsset(marketType, assetRequested),
        });
    },

    search: function (req, res) {
        const marketType = req.params.marketType;
        const assetRequested = req.body.search;
        const asset = assetService.findAsset(marketType, assetRequested);
        res.redirect("/markets/" + marketType + "/" + asset.id);
    },

    create: function (req, res) {
        res.render("products/createProductForm", {
            pageTitle: "Create Product - UniFi",
        });
    },

    store: (req, res) => {
        const asset = {
            ...req.body,
        };

        assetService.saveAssets(asset);

        res.redirect("/markets/" + asset.type);
    },

    update: function (req, res) {
        res.render("products/editProductForm", {
            pageTitle: "Edit Product - UniFi",
        });
    },

    delete: function (req, res) {
        res.render("products/deleteProduct", {
            pageTitle: "Delete Product - UniFi",
        });
    },
};

module.exports = marketsController; 