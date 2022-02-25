// se importan las bases de datos
const db = require("../database/models");
// se importa el servicio de activos
const assetService = require("../services/assets");

const marketsController = {
    // funcion controladora para la pagina de "descubrir"/"mercados"
    markets: async function (req, res) {
        try {
            const assetList = await assetService.getAssets();
            res.render("products/markets", {
                pageTitle: "UniFi - Markets",
                // recibe lista ordenada y devuelve el primer activo (mayor ganador y mayor perdedor)
                mainGainer: assetList[0],
                mainLoser: assetList[assetList.length - 1],
                assetList,
            });
        } catch (err) {
            console.error(err);
        }
    },

    // funcion controladora para listar los activos de los mercados individuales
    list: async function (req, res) {
        const marketType = req.params.marketType;
        res.render("products/productList", {
            marketType,
            pageTitle: "Invest in UniFi - " + marketType,
        });
    },

    // funcion controladora para la pagina de detalle de cada activo
    detail: async function (req, res) {
        try {
            const assetRequested = req.params.asset; //id del producto
            const asset = await assetService.findAsset(assetRequested);

            res.render("products/productDetail", {
                asset,
                pageTitle: asset.ticker + " - Details",
            });
        } catch (error) {
            console.log(error);
        }
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
    store: async function (req, res) {
        if (req.file) {
            req.body.logo = "/img/assets/" + req.file.filename;
        }
        // invoca a función createAsset de Services - assets para crear un producto
        try {
            const assetRequested = req.body;
            const createAsset = await assetService.createAsset(assetRequested);
            //busca el nombre de type correspondiente con el id
            const type = assetService.parseMarketType(createAsset.type_id);

            res.redirect("/markets/" + type);
        } catch (err) {
            console.log("there was an error creating the asset: ", err);
        }
    },

    // funcion controladora para renderizar el formulario de edicion de activos
    edit: async function (req, res) {
        try {
            const assetRequested = req.params.id;
            //obtiene el objeto de la consulta a la BD
            const asset = await assetService.findAsset(assetRequested);

            res.render("products/editProductForm", {
                pageTitle: "UniFi - Edit Product",
                asset,
            });
        } catch (err) {
            console.log(err);
        }
    },

    // funcion controladora para editar activos existentes en la base de datos
    update: async function (req, res) {
        if (req.file) {
            req.body.logo = "/img/" + req.file.filename;
        }

        try {
            req.body.id = req.params.id;
            const update = await assetService.updateAsset(req.body);
            res.redirect("/markets/" + req.body.type + "/" + req.body.id);
        } catch (err) {
            console.error(err);
        }
    },

    // funcion controladora para borrar activos existentes en la base de datos
    delete: function (req, res) {},

    // funcion controladora para generar transacciones en la base de datos
    transaction: async function (req, res) {
        const purchase = req.body;

        try {
            req.body.user_id = req.session.authenticatedUser.id;
            const transaction = await assetService.generateTransaction(
                purchase
            );
            return res.redirect(`/markets${req.url}`);
        } catch (err) {
            console.error(err);
        }
    },
};

module.exports = marketsController;
