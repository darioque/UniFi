// se importan las bases de datos
const db = require("../database/models");
// se importa el servicio de activos
const assetService = require("../services/assets");
const userService = require("../services/users");

const apiController = {
    // funcion controladora para la pagina de "descubrir"/"mercados"
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

    // funcion controladora para listar los activos de los mercados individuales
    listAssets: async function (req, res) {
        try {
            const marketType = req.params.marketType;
            const order = [req.query.orderBy??'ticker', req.query.sortBy??'ASC']
            console.log(req.query);
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
            const assetList = await assetService.getAssets();
            res.status(200).json({
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
            const userList = await userService.getUsers();
            res.status(200).json({
                meta: {
                    status: 200,
                    count: userList.length,
                },
                data: userList,
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
