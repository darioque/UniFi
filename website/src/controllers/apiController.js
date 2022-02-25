// se importan las bases de datos
const db = require("../database/models");
// se importa el servicio de activos
const assetService = require("../services/assets");

const apiController = {
    // funcion controladora para la pagina de "descubrir"/"mercados"
    listTypes: async function (req, res) {
        const types = await db.Type.findAll();
        res.status(200).json({
            meta: {
                status: 200,
                count: types.length,
            },
            data: types,
        });
    },

    // funcion controladora para listar los activos de los mercados individuales
    listAssets: async function (req, res) {
        try {
            const assetList = await db.Asset.findAll({
                include: [{ association: "type" }],
                where: { 
                    type_id: await assetService.parseMarketType(req.params.marketType)
                }
            });
            res.status(200).json({
                meta: {
                    status: 200,
                    count: assetList.length,
                },
                data: assetList,
            });
        } catch (err) {
            console.error(err);
        }
    },
    // funcion controladora para listar los activos de los mercados individuales
    listAllAssets: async function (req, res) {
        const assetList = await db.Asset.findAll({
            include: [{ association: "type" }],
        });
        res.status(200).json({
            meta: {
                status: 200,
                count: assetList.length,
            },
            data: assetList,
        });
    },

    listTransactions: async function (req, res) {
        const transactionList = await db.Transaction.findAll();
        res.status(200).json({
            meta: {
                status: 200,
                count: transactionList.length,
            },
            data: transactionList,
        });
    },

    listUsers: async function (req, res) {
        const userList = await db.User.findAll();
        res.status(200).json({
            meta: {
                status: 200,
                count: userList.length,
            },
            data: userList,
        });
    },
};

module.exports = apiController;
