// se importan las bases de datos
const db = require("../database/models");

async function generateId() {
    try {
        const count = await db.Asset.count();
        return count + 1;
    } catch (err) {
        console.error("there was an error generating the id: ", err);
    }
}

async function getAssets() {
    const cryptos = await db.Asset.findAll({
        include: [
            {
                association: "type",
            },
        ],
        order: [["price_change_24", "DESC"]],
    });
    return cryptos;
}

async function getCrypto() {
    const cryptos = await db.Asset.findAll({
        where: {
            type_id: 1,
        },
    });
    return cryptos;
}
async function getStock() {
    const stocks = await db.Asset.findAll({
        where: {
            type_id: 2,
        },
    });
    return stocks;
}

async function createAsset(assetRequested) {
    const create = await db.Asset.create({
        id: await generateId(),
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
}

async function updateAsset(assetRequested) {
    const update = await db.Asset.update(
        {
            ...assetRequested,
        },
        {
            where: { id: assetRequested.id },
        }
    );
    return update;
}

async function findAsset(assetRequested) {
    try {
        const asset = await db.Asset.findByPk(assetRequested, {
            include: [
                {
                    association: "type",
                },
            ],
        });
        return asset;
    } catch (err) {
        console.error(err);
    }
}

function parseMarketType(market) {
    return market == 1
        ? "cryptocurrencies"
        : market == 2
        ? "stocks"
        : market == "cryptocurrencies"
        ? 1
        : 2;
}

async function generateTransaction(purchase) {
    const transaction = await db.Transaction.create({
        ...purchase
    })
}

function deleteAsset(assetId) {}

module.exports = {
    getStock,
    getCrypto,
    getAssets,
    createAsset,
    updateAsset,
    findAsset,
    deleteAsset,
    parseMarketType,
    generateTransaction,
};
