// se importan las bases de datos
const db = require("../database/models");

const fs = require("fs");
const path = require("path");
const stockListJSON = fs.readFileSync(
    path.join(__dirname, "../data/stocksList.json")
);
const cryptoListJSON = fs.readFileSync(
    path.join(__dirname, "../data/cryptocurrenciesList.json")
);
const cryptoFilePath = path.join(
    __dirname,
    "../data/cryptocurrenciesList.json"
);
const stockFilePath = path.join(__dirname, "../data/stocksList.json");
const stockList = JSON.parse(stockListJSON);
const cryptoList = JSON.parse(cryptoListJSON);
const assetList = stockList.concat(cryptoList);

// devuelve lista de criptomonedas
function getCrypto() {
    return cryptoList;
}

// devuelve lista de acciones
function getStock() {
    return stockList;
}

// devuelve lista de todos los activos juntos
function getAll() {
    return assetList;
}

// devuelve lista dependiendo del tipo solicitado
function getAssetList(marketType) {
    const assetList =
        marketType === "cryptocurrencies" ? cryptoList : stockList;
    return assetList;
}

function generateId(type) {
    const assetList = this.getAssetList(type);
    const lastAsset = assetList[assetList.length - 1];
    if (lastAsset) {
        return lastAsset.id + 1;
    }
    return 1;
}

function saveAssets(assetData, ) {
    // agrega el nuevo activo a la lista correspondiente usando las funciones getAssetList y push
    const assetList = this.getAssetList(assetData.type);
    const newAssetId = this.generateId(assetData.type);
    const newAsset = {
        id: newAssetId,
        ...assetData,
    };
    assetList.push(newAsset);
    // selecciona la ruta de archivo correspondiente a actualizar
    const filePath =
        assetData.type === "cryptocurrencies" ? cryptoFilePath : stockFilePath;
    // transforma la lista en formato JSON
    const updatedJSON = JSON.stringify(assetList, null, 4);
    // escribe el array actualizado al JSON
    fs.writeFileSync(filePath, updatedJSON, "utf-8");
}

async function createAsset(assetRequested) {
    try {
        const create = await db.Asset.create({
            name: assetRequested.name,
            ticker: assetRequested.ticker,
            price: assetRequested.price,
            price_change_24: assetRequested.change,
            supply: assetRequested.price * assetRequested.change,
            mcap: assetRequested.mcap,
            logo: assetRequested.logo,
            type_id: assetRequested.type_id
        });
        return create;
    } catch (error) {
        console.error(error);
    }
}

function updateAsset(assetData) {
    const assetList = this.getAssetList(assetData.type);
    assetIndex = assetList.findIndex((asset) => asset.id == assetData.id);
    assetList[assetIndex] = {
        id: assetList[assetIndex].id,
        name: assetData.name,
        type: assetList[assetIndex].type,
        ticker: assetData.ticker,
        price: parseFloat(assetData.price),
        change: parseFloat(assetData.change),
        logo: assetData.logo ? assetData.logo : assetList[assetIndex].logo,
        mcap: parseInt(assetData.mcap).toLocaleString("en"),
    };
    const filePath =
        assetData.type === "cryptocurrencies" ? cryptoFilePath : stockFilePath;
    const updatedJSON = JSON.stringify(assetList, null, 4);
    fs.writeFileSync(filePath, updatedJSON, "utf-8");
}

async function findAsset(assetRequested) {
    try {
        const asset = await db.Asset.findByPk(assetRequested, {
            include: [                
                { association: "transactionInput" },
                { association: "transactionOutput" },
                { association: "type" },
                { association: "users"}
            ],
        });
        return asset;
    } catch(error){
        console.log(error);
    };    
}

async function findTypeId(id) {
    try {
        const nameType = await db.Type.findByPk(id);
        return nameType;
    } catch (error) {
        console.log(error);
    }
}

function deleteAsset(assetId) {}

// ordena todos los activos con respecto a su cambio de precio (mayor a menor)
function sortByGainers(assetList) {
    gainers = assetList.sort(function (a, b) {
        if (a.change < b.change) {
            return 1;
        }
        if (a.change > b.change) {
            return -1;
        }
        return 0;
    });
    return gainers;
}

// ordena todos los activos con respecto a su cambio de precio (menor a mayor)
function sortByLosers(assetList) {
    losers = [...sortByGainers(assetList)].reverse();
    return losers;
}

module.exports = {
    getAll,
    getCrypto,
    getStock,
    getAssetList,
    saveAssets,
    createAsset,
    updateAsset,
    findAsset,
    findTypeId,
    deleteAsset,
    sortByGainers,
    sortByLosers,
    generateId,
};
