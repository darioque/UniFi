// se importan las bases de datos
const db = require("../database/models");

async function generateId(model) {
    const id = await model.max("id");
    return id + 1;
}



async function listTypes() {
    const types = await db.Type.findAll();
    return types
}

async function getTransactions() {
    const transactions = await db.Transaction.findAll();
    return transactions
}

async function getAssets(order = ["ticker", "ASC"]) {
    const cryptos = await db.Asset.findAll({
        include: [
            {
                association: "type",
            },
        ],
        order: [order],
    });
    return cryptos;
}

async function getCrypto(order = ['ticker', 'ASC']) {
    let cryptos = [];
    const resultCryptos = await db.Asset.findAll({
        include: [
            {
                association: "type",
            },
        ],
        where: {
            type_id: 1,
        },
        order: [order],
    });

    //completa el array con criptomonedas a partir de la propiedad dataValues del resultado de la BD
    for (let i = 0; i < resultCryptos.length; i++){
        cryptos[i] = resultCryptos[i].dataValues;
    };

    return cryptos;
}
async function getStock(order = ["ticker", "ASC"]) {
    let stocks = [];
    const resultStocks = await db.Asset.findAll({
        include: [
            {
                association: "type",
            },
        ],
        where: {
            type_id: 2,
        },
        order: [order],
    });

    ////completa el array con activos a partir de la propiedad dataValues del resultado de la BD
    for (let i = 0; i < resultStocks.length; i++){
        stocks[i] = resultStocks[i].dataValues;
    };

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

async function findAsset(assetRequested, marketType = 1 || 2) {
    const asset = await db.Asset.findOne({
        where: {
            id: assetRequested,
            type_id: marketType,
        },
        include: [
            {
                association: "type",
            },
        ],
    });
    return asset;
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
    if (await updateBalance(purchase)) {
        const transaction = await db.Transaction.create({
            ...purchase,
            id: await generateId(db.Transaction),
        });
        return transaction;
    }
    return null;
}

async function updateBalance(transactionData) {
    const inputAssetBalance = await db.AssetUser.findOne({
        where: {
            user_id: transactionData.user_id,
            asset_id: transactionData.input_asset_id,
        },
    });
    if (!inputAssetBalance) {
        throw new Error("Insufficient Balance");
    }
    if (inputAssetBalance.amount - transactionData.price < 1) {
        throw new Error("Insufficient Balance");
    }
    await inputAssetBalance.update({
        amount: inputAssetBalance.amount - transactionData.price,
    });

    const outputAssetBalance = await db.AssetUser.findOne({
        where: {
            user_id: transactionData.user_id,
            asset_id: transactionData.output_asset_id,
        },
    });
    if (outputAssetBalance) {
        return await outputAssetBalance.update({
            amount: outputAssetBalance.amount + transactionData.amount,
        });
    } else {
        return await db.AssetUser.create({
            id: await generateId(db.AssetUser),
            user_id: transactionData.user_id,
            asset_id: transactionData.output_asset_id,
            amount: transactionData.amount,
        });
    }
}

async function deleteAsset(assetId) {
    const asset = await this.findAsset(assetId);
    await asset.setInput([]);
    await asset.setOutput([]);
    await asset.setUsers([]);
    await asset.destroy();
    return asset;
}

module.exports = {
    getStock,
    getCrypto,
    getAssets,
    createAsset,
    updateAsset,
    findAsset,
    deleteAsset,
    listTypes,
    parseMarketType,
    generateTransaction,
    getTransactions,
};
