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
    list: function (req, res) {
        const marketType = req.params.marketType;
        res.render("products/productList", {
            marketType,
            pageTitle: "Invest in UniFi - " + marketType,
            assetList: assetService.getAssetList(marketType),
        });
    },

    // funcion controladora para la pagina de detalle de cada activo
    detail: function (req, res) {
        const assetRequested = req.params.asset;
        const marketType = req.params.marketType;
        res.render("products/productDetail", {
            pageTitle: assetRequested + " - Details",
            asset: assetService.findAsset(marketType, assetRequested),
        });
    },

    // funcion controladora para el search bar del listado de activos que redirecciona al detalle
    search: function (req, res) {
        const marketType = req.params.marketType;
        const assetRequested = req.body.search;
        const asset = assetService.findAsset(marketType, assetRequested);
        res.redirect("/markets/" + marketType + "/" + asset.id);
    },

    // funcion controladora para el renderizado del formulario de creacion de activos
    create: function (req, res) {
        res.render("products/createProductForm", {
            pageTitle: "Create Product - UniFi",
        });
    },

    // funcion controladora para agregar el nuevo activo a la base de datos y mostrar nuevamente el listado
    store: (req, res) => {
        const asset = {
            ...req.body,
        };

        assetService.saveAssets(asset);

        res.redirect("/markets/" + asset.type);
    },

    // funcion controladora para renderizar el formulario de edicion de activos
    edit: function (req, res) {
        const assetRequested = req.params.asset;
        const marketType = req.params.marketType
        const asset = assetService.findAsset(marketType, assetRequested);
        res.render("products/editProductForm", {
            pageTitle: "Edit Product - UniFi",
            asset,
        });
    },
    // funcion controladora para editar activos existentes en la base de datos
    update: function (req, res) {
        const id = req.params.id;
        const marketType = req.params.marketType;
        const index = products.findIndex((asset) => asset.id == id);

        const updatedProduct = {
            id: products[index].id,
            ...req.body,
        };

        products[index] = updatedProduct;

        assetService.saveAssets();

        res.redirect(`/markets/${marketType}/${id}`);
    },
    // funcion controladora para borrar activos existentes en la base de datos
    delete: function (req, res) {
        res.render("products/deleteProduct", {
            pageTitle: "Delete Product - UniFi",
        });
    },
};

module.exports = marketsController;
