// se importa express validator para recibir las validaciones
const { validationResult } = require("express-validator");
// se importa unlink para borrar las imagenes de activos que no pasen validacion
const { unlink } = require("fs/promises");
const path = require('path')
// se importan las bases de datos
const db = require("../database/models");
// se importa el servicio de activos
const assetService = require("../services/assets");

const marketsController = {
    // funcion controladora para la pagina de "descubrir"/"mercados"
    markets: async function (req, res) {
        try {
            const assetList = await assetService.getAssets([
                "price_change_24",
                "DESC",
            ]);
            res.render("products/markets", {
                pageTitle: "UniFi - Markets",
                // recibe lista ordenada y devuelve el primer activo (mayor ganador y mayor perdedor)
                mainGainer: assetList[0],
                mainLoser: assetList[assetList.length - 1],
                assetList,
            });
        } catch (err) {
            console.error(err);
            res.status(404).render("not-found");
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
            const assetRequested = req.params.id; //id del producto
            const marketType = assetService.parseMarketType(
                req.params.marketType
            );
            const asset = await assetService.findAsset(
                assetRequested,
                marketType
            );

            res.render("products/productDetail", {
                asset,
                pageTitle: asset.ticker + " - Details",
            });
        } catch (err) {
            console.error(err);
            res.status(404).render("not-found");
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
        // guarda los errores en una variable
        const errors = validationResult(req);
        // si hubo errores (el array no está vacío) mandar los mensajes a la vista del formulario y borrar el logo subido (si existe)
        if (!errors.isEmpty()) {
            if (req.file) {
                try {
                    await unlink(path.resolve(__dirname, `../../../${req.file.path}`));
                    console.log("Successfully deleted logo");
                } catch (error) {
                    console.error("There was an error deleting the image: ", error);
                }
            }
            return res.render("products/createProductForm", {
                pageTitle: "Create Product - UniFi",
                marketType: req.params.marketType,
                errorMessages: errors.mapped(),
            });
        }

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
            res.status(404).render("not-found");
        }
    },

    // funcion controladora para renderizar el formulario de edicion de activos
    edit: async function (req, res) {
        try {
            const assetRequested = req.params.id;
            //obtiene el objeto de la consulta a la BD
            const marketType = assetService.parseMarketType(
                req.params.marketType
            );
            const asset = await assetService.findAsset(
                assetRequested,
                marketType
            );
            res.render("products/editProductForm", {
                pageTitle: "UniFi - Edit Product",
                asset,
            });
        } catch (err) {
            console.error(err);
            res.status(404).render("not-found");
        }
    },

    // funcion controladora para editar activos existentes en la base de datos
    update: async function (req, res) {
        // guarda los errores en una variable
        const errors = validationResult(req);

        const asset = await assetService.findAsset(req.params.id)
        // si hubo errores (el array no está vacío) mandar los mensajes a la vista del formulario y borrar el logo subido (si existe)
        if (!errors.isEmpty()) {
            if (req.file) {
                try {
                    await unlink(path.resolve(__dirname, `../../../${req.file.path}`));
                    console.log("Successfully deleted logo");
                } catch (error) {
                    console.error("There was an error deleting the image: ", error);
                    res.redirect("/");
                }
            }
            return res.render("products/editProductForm", {
                pageTitle: "UniFi - Edit Product",
                asset,
                errorMessages: errors.mapped(),
            });
        }

        if (req.file) {
            req.body.logo = "/img/assets/" + req.file.filename;
        }

        try {
            req.body.id = req.params.id;
            const update = await assetService.updateAsset(req.body);
            const marketType = assetService.parseMarketType(req.body.type_id);
            res.redirect("/markets/" + marketType + "/" + req.body.id);
        } catch (err) {
            console.error(err);
            res.status(404).render("not-found", {err});
        }
    },

    // funcion controladora para borrar activos existentes en la base de datos
    delete: async function (req, res) {
        try {
            const assetId = req.params.id;
            const asset = await assetService.deleteAsset(assetId);
            await unlink(path.resolve(__dirname, `../../../public/${asset.logo}`));
            console.log("Successfully deleted logo");
            res.redirect("/markets/" + req.params.marketType);
        } catch (err) {
            console.error("there was an error deleting the asset", err);
            res.status(404).render("not-found", {err});
        }
    },

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
            res.status(404).render("not-found", { err });
        }
    },
};

module.exports = marketsController;
