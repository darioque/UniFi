// se importan las bases de datos
const db = require("../database/models");
const Op = db.Sequelize.Op
const sequelize = require('sequelize')

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

async function findAssetApi(assetId) {
    const asset = await db.Asset.findByPk(assetId,{
        include: [
            {
                association: 'input'
            },
            {
                association: 'output'
            },
            {
                association: 'type'
            }
        ]
    })
    return asset
}

async function getAssetsApi(limit = null, offset = 0) {
    const assets = await db.Asset.findAll({
        attributes: [
            "id",
            "name",
            "description",
            [
                sequelize.fn(
                    "CONCAT",
                    `http://localhost:3001/api/markets/`,
                    sequelize.col("asset.id"),
                    `/`
                ),
                "detail",
            ],
        ],
        include: [
            {
                association: "type",
            },
        ],
        limit: limit?Number(limit):limit,
        offset: Number(offset) * Number(limit),
    });
    const cryptoCount = await db.Asset.count({
        where: {
            type_id: 1,
        }
    })

    const stockCount = await db.Asset.count({
        where: {
            type_id: 2,
        }
    })
    return {assets, stockCount, cryptoCount}
}

async function getAssets(order = ["ticker", "ASC"]) {
    const assets = await db.Asset.findAll({
        include: [
            {
                association: "type",
            },
        ],
        order: [order],
    });
    return assets;
}

async function getCrypto(order = ['ticker', 'ASC']) {
    const cryptos = await db.Asset.findAll({
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

    return cryptos;
}
async function getStock(order = ["ticker", "ASC"]) {
    const stocks = await db.Asset.findAll({
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

    return stocks;
}

async function createAsset(assetRequested) {
    const create = await db.Asset.create({
        id: await generateId(db.Asset),
        name: assetRequested.name,
        ticker: assetRequested.ticker,
        price: assetRequested.price,
        price_change_24: parseFloat(assetRequested.price_change_24) ?? 0.0,
        supply: assetRequested.supply,
        mcap:
            assetRequested.mcap ?? assetRequested.price * assetRequested.supply,
        logo: assetRequested.logo,
        type_id: parseInt(assetRequested.type_id),
        description: assetRequested.description,
    });
    return create;
}

async function updateAsset(assetRequested) {
    const update = await db.Asset.update(
        {
            id: parseInt(assetRequested.id),
            name: assetRequested.name,
            type_id: parseInt(assetRequested.type_id),
            ticker: assetRequested.ticker,
            price: parseFloat(assetRequested.price),
            price_change_24: parseFloat(assetRequested.price_change_24),
            supply: parseInt(assetRequested.supply),
            logo: assetRequested.logo,
            mcap: parseInt(assetRequested.mcap),
            description: assetRequested.description,
        },
        {
            where: { id: assetRequested.id },
        }
    );
    return update;
}

async function findAsset(assetRequested, marketType) {
    const asset = await db.Asset.findOne({
        where: {
            id: assetRequested,
            type_id: {
                [Op.or]: [marketType??1, marketType??2]
            }
        },
        include: [
            {
                association: "type",
            },
        ],
    });
    if (!asset) {
        throw new Error('Asset does not exist')
    }
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
            amount: outputAssetBalance.amount + Number(transactionData.amount),
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

async function deposit(userId, amount) {
    const balance = await db.AssetUser.create({
        id: await generateId(db.AssetUser),
        user_id: userId,
        asset_id: 1,
        amount: amount,
    })
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
    deposit,
    getAssetsApi,
    findAssetApi,
};
