// se importan las bases de datos
const db = require("../database/models");
// se importa el servicio de activos
const assetService = require("../services/assets");

const marketsController = {
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
        // test de modelos y asociaciones
        try {
            const transaction = await db.Transaction.findByPk(1, {
                include: [
                    { association: "inputAsset" },
                    { association: "outputAsset" },
                    { association: "user" },
                ],
            });
            
        } catch (error) {
            console.log(error);
        }

        const marketType = req.params.marketType;
        res.render("products/productList", {
            marketType,
            pageTitle: "Invest in UniFi - " + marketType,
        });
    },

    // funcion controladora para la pagina de detalle de cada activo
    detail: async function (req, res) {
        console.log ("paso por Detail");        
        try {
            const assetRequested = req.params.asset; //id del producto
            const marketType = req.params.marketType; //tipo de producto          
            //obtiene el objeto de la consulta a la BD 
            const objectAsset = await assetService.findAsset(assetRequested);
            const asset = objectAsset.dataValues;
            //obtiene el objeto type de la tabla Types
            const typeId = await assetService.findTypeName(asset.type_id);
            const nameType = typeId.dataValues.name;

            res.render("products/productDetail", {
                asset,
                pageTitle: asset.ticker + " - Details",
                nameType,
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
        console.log ("PASO POR DETAIL");
        if (req.file) {
            req.body.logo = "/img/assets/" + req.file.filename;
        }
        // invoca a función createAsset de Services - assets para crear un producto
        try {
            const assetRequested = req.body;
            const createAsset = await assetService.createAsset(assetRequested);
            //obtiene el type_id de la creación de producto en la BD
            const typeId = createAsset.dataValues.type_id;
            //busca el nombre de type correspondiente con el id
            const objectType = await assetService.findTypeName(typeId);
            const nameType = objectType.dataValues.name;

            res.redirect("/markets/" + nameType);

        } catch (error) {
            console.log (error);
        }
    },

    // funcion controladora para renderizar el formulario de edicion de activos
    edit: async function (req, res) {
        console.log ("PASO POR EDIT");
        try {
            const assetRequested = req.params.id;
            //obtiene el objeto de la consulta a la BD 
            const objectAsset = await assetService.findAsset(assetRequested);
            const asset = objectAsset.dataValues;
             //obtiene el objeto type de la tabla Types
            const typeId = await assetService.findTypeName(asset.type_id);
            const nameType = typeId.dataValues.name;

            res.render("products/editProductForm", {
                pageTitle: "UniFi - Edit Product",
                asset,
                nameType,
            });
        } catch (error) {
            console.log(error);
        }        
    },

    // funcion controladora para editar activos existentes en la base de datos
    update: async function (req, res) {
        console.log ("PASO POR UPDATE");
        if (req.file) {
            req.body.logo = "/img/" + req.file.filename;
        }

        try {
            const marketType = req.params.marketType;
            const ObjectIdMarketType = await assetService.findTypeId(marketType); //obtiene el objeto de la tabla Types
            const idMarketType = ObjectIdMarketType.dataValues.id; //obtiene el id de la variable de consulta a la BD
            const assetId = req.params.id;       
            const update = await assetService.updateAsset(req.body, assetId, idMarketType);
            res.redirect("/markets/" + marketType + "/" + assetId);

        } catch (error) {
            console.log(error);
        }        
    },

    // funcion controladora para borrar activos existentes en la base de datos
    delete: function (req, res) {
        res.render("products/deleteProduct", {
            pageTitle: "Delete Product - UniFi",
        });
    },
};

module.exports = marketsController;
