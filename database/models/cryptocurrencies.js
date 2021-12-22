module.exports = (sequelize, dataTypes) => {
    const alias = "Cryptocurrencies";
    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        type: {
            allowNull: false,
            type: dataTypes.CHAR,
        },
        ticker: {
            allowNull: false,
            type: dataTypes.VARCHAR(5),
        },
        price: {
            allowNull: true,
            type: dataTypes.INTEGER,
        },
        change: {
            allowNull: true,
            type: dataTypes.INTEGER,
        },
        logo: {
            allowNull: true,
            type: dataTypes.STRING,
        },
        mcap: {
            allowNull: true,
            type: dataTypes.INTEGER,
        },
    };
    const config = {
        tableName: "cryptocurrencies",
        timestamps: false,
    };
    const Crypto = sequelize.define(alias, cols, config);

    return Crypto;
};
