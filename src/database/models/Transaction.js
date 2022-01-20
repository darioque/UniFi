module.exports = (sequelize, dataTypes) => {
    let alias = "Transaction";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        created_at: {
            type: dataTypes.DATE,
        },
        updated_at: {
            type: dataTypes.DATE,
        },
        amount: {
            type: dataTypes.DECIMAL(24, 12),
        },
        price: {
            type: dataTypes.DECIMAL(24, 12),
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            foreignKey: true,
        },
        input_asset_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            foreignKey: true,
        },
        output_asset_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            foreignKey: true,
        },
    };
    let config = {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false,
    };
    const Transaction = sequelize.define(alias, cols, config);

    Transaction.associate = function (models) {
        Transaction.belongsTo(models.Asset, {
            as: "inputAsset",
            foreignKey: "input_asset_id",
        });
        Transaction.belongsTo(models.Asset, {
            as: "outputAsset",
            foreignKey: "output_asset_id",
        });
        Transaction.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        })
    };

    return Transaction;
};
