// se importan las bases de datos
const db = require("../database/models");
// se importa el servicio de activos
const assetService = require("../services/assets");

const apiController = {
    // funcion controladora para la pagina de "descubrir"/"mercados"
    markets: function (req, res) {
        const assetList = assetService.getAll();
        res.render("products/markets", {
            pageTitle: "UniFi - Markets",
            // recibe lista ordenada y devuelve el primer activo (mayor ganador y mayor perdedor)
            mainGainer: assetService.sortByGainers(assetList)[0],
            mainLoser: assetService.sortByLosers(assetList)[0],
            assetList,
        });
    },

    // funcion controladora para listar los activos de los mercados individuales
    list: async function (req, res) {
        const assetList = await db.Asset.findAll({
            where: {
                type_id: 1,
            },
            include: [{association: 'type'}],
            limit: 15,
        })
        res.status(200).json({
            meta: {
                status: 200,
                count: assetList.length
            },
            data: assetList
        })
    },

    // funcion controladora para la pagina de detalle de cada activo
    detail: function (req, res) {
        const assetRequested = req.params.asset;
        const marketType = req.params.marketType;
        const asset = assetService.findAsset(marketType, assetRequested);
        res.render("products/productDetail", {
            asset,
            pageTitle: asset.ticker + " - Details",
        });
    },

    // funcion controladora para el search bar del listado de activos que redirecciona al detalle
    search: function (req, res) {
        const marketType = req.params.marketType;
        const assetRequested = req.query.search;
        const asset = assetService.findAsset(marketType, assetRequested);
        const assetList = assetService.getAssetList(marketType);
        res.render("products/productList", {
            marketType,
            pageTitle: "Invest in UniFi - " + marketType,
            assetList: asset ? [asset] : assetList,
        });
    },

    // funcion controladora para el renderizado del formulario de creacion de activos
    create: function (req, res) {
        const marketType = req.params.marketType;
        res.render("products/createProductForm", {
            pageTitle: "Create Product - UniFi",
            marketType,
        });
    },

    // funcion controladora para agregar el nuevo activo a la base de datos y mostrar nuevamente el listado
    store: (req, res) => {
        req.body.logo = "/img/assets/" + req.file.filename;
        assetService.saveAssets(req.body);
        res.redirect("/markets/" + req.body.type);
    },

    // funcion controladora para renderizar el formulario de edicion de activos
    edit: function (req, res) {
        const assetRequested = req.params.asset;
        const marketType = req.params.marketType;
        const asset = assetService.findAsset(marketType, assetRequested);
        res.render("products/editProductForm", {
            pageTitle: "UniFi - Edit Product",
            asset,
        });
    },

    // funcion controladora para editar activos existentes en la base de datos
    update: function (req, res) {
        const assetId = req.params.asset;
        const marketType = req.params.marketType;
        if (req.file) {
            req.body.logo = "/img/" + req.file.filename;
        }
        assetService.updateAsset(req.body);
        res.redirect(`/markets/${marketType}/${assetId}`);
    },

    // funcion controladora para borrar activos existentes en la base de datos
    delete: function (req, res) {
        res.render("products/deleteProduct", {
            pageTitle: "Delete Product - UniFi",
        });
    },
};

module.exports = apiController;
