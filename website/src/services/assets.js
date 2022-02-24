// se importan las bases de datos
const db = require("../database/models");

async function generateId() {
    const count = await db.Asset.count();
    return count + 1;
}


async function getAssets() {
    try {
        const cryptos = await db.Asset.findAll({
            include: [{
                association: 'type',
            }],
            order: [
                ['price_change_24', 'DESC']
            ],
        });
        return cryptos;
    } catch (err) {
        console.error("there was an error retrieving assets", err);
    }
}

async function getCrypto() {
    try {
        const cryptos = await db.Asset.findAll({
            where: {
                type_id: 1,
            }
        })
        return cryptos
    } catch (err) {
        console.error("there was an error retrieving cryptos", err)
    }
}
async function getStock() {
    try {
        const stocks = await db.Asset.findAll({
            where: {
                type_id: 2,
            }
        })
        return stocks
    } catch (err) {
        console.error("there was an error retrieving stocks", err)
    }
}

async function createAsset(assetRequested) {
    try {
        const create = await db.Asset.create({
            id: await this.generateId(),
            name: assetRequested.name,
            ticker: assetRequested.ticker,
            price: assetRequested.price,
            price_change_24: assetRequested.change ?? 0,
            supply: assetRequested.price * assetRequested.change,
            mcap: assetRequested.mcap,
            logo: assetRequested.logo,
            type_id: assetRequested.type_id,
            state_id: 1,
        });
        return create;
    } catch (error) {
        console.error(error);
    }
}

async function updateAsset(assetRequested, assetId, idMarketType) {
    try {
        const update = await db.Asset.update({
            name: assetRequested.name,
            ticker: assetRequested.ticker,
            price: assetRequested.price,
            price_change_24: assetRequested.price_change_24,
            supply: assetRequested.supply,
            mcap: assetRequested.mcap || assetRequested.price * assetRequested.supply,
            logo: assetRequested.logo,
            type_id: idMarketType,
        },{
            where: {id: assetId},
        });
        return update;
    } catch (error) {
        console.log (error);
    };    
}

async function findAsset(assetRequested) {
    try {
        const asset = await db.Asset.findByPk(assetRequested);
        return asset;
    } catch(error){
        console.log(error);
    };    
}

async function findTypeName(id) {
    //Busca el nombre, a partir del id, correspondiente en la tabla Types de activos
    try {
        const nameType = await db.Type.findByPk(id);
        return nameType;
    } catch (error) {
        console.log(error);
    };
}

async function findTypeId(name){
    try {
        const idType = await db.Type.findOne({ where: { name: name } });
        return idType;
    } catch (error) {
        console.log(error);
    }

}

function parseMarketType(market) {
    return market == 1 || market == 2? market: market == 'cryptocurrencies'? 1: 2
}

function deleteAsset(assetId) {}


module.exports = {
    getStock,
    getCrypto,
    getAssets,
    createAsset,
    updateAsset,
    findAsset,
    findTypeName,
    findTypeId,
    deleteAsset,
    parseMarketType,
};
