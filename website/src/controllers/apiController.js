// se importan las bases de datos
const db = require("../database/models");
// se importa el servicio de activos
const assetService = require("../services/assets");
const userService = require("../services/users");

const apiController = {
    listTypes: async function (req, res) {
        try {
            const types = await assetService.listTypes();
            return res.status(200).json({
                meta: {
                    status: 200,
                    count: types.length,
                },
                data: types,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                meta: {
                    status: 400,
                },
                data: err,
            });
        }
    },

    listAssets: async function (req, res) {
        try {
            const marketType = req.params.marketType;
            const order = [
                req.query.sortBy ?? "ticker",
                req.query.orderBy ?? "ASC",
            ];
            const assetList =
                marketType == "stocks"
                    ? await assetService.getStock(order)
                    : await assetService.getCrypto(order);
            return res.status(200).json({
                meta: {
                    status: 200,
                    count: assetList.length,
                },
                data: assetList,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                meta: {
                    status: 400,
                },
                data: err,
            });
        }
    },

    // funcion controladora para listar los activos de los mercados individuales
    listAllAssets: async function (req, res) {
        try {
            const limit = req.query.limit;
            const page = req.query.page;
            const response = await assetService.getAssetsApi(limit, page);
            const { assets, stockCount, cryptoCount } = response;

            res.status(200).json({
                count: stockCount + cryptoCount,
                countByCategory: {
                    cryptocurrencies: cryptoCount,
                    stocks: stockCount,
                },
                assets,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                meta: {
                    status: 400,
                },
                data: err,
            });
        }
    },

    listTransactions: async function (req, res) {
        try {
            const transactionList = await assetService.getTransactions();
            res.status(200).json({
                meta: {
                    status: 200,
                    count: transactionList.length,
                },
                data: transactionList,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                meta: {
                    status: 400,
                },
                data: err,
            });
        }
    },

    listUsers: async function (req, res) {
        try {
            const userList = await userService.getUsersApi();
            res.status(200).json({
                count: userList.length,
                users: userList,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                meta: {
                    status: 400,
                },
                data: err,
            });
        }
    },
    assetDetail: async function (req, res) {
        try {
            const assetId = req.params.id;
            const asset = await assetService.findAssetApi(assetId);
            res.status(200).json({
                asset,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                meta: {
                    status: 400,
                },
                data: err,
            });
        }
    },
    userDetail: async function (req, res) {
        try {
            const userId = req.params.id;
            const user = await userService.findUserApi(userId);
            res.status(200).json({
                user,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                meta: {
                    status: 400,
                },
                data: err,
            });
        }
    },
};

module.exports = apiController;
