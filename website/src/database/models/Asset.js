module.exports = (sequelize, dataTypes) => {
    let alias = "Asset";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true,
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false,
        },
        ticker: {
            type: dataTypes.STRING(10),
            allowNull: false,
        },
        price: {
            type: dataTypes.DECIMAL(24, 12),
            allowNull: true,
            get() {
                const value = this.getDataValue("price");
                return value === null ? null : Number(value);
            },
        },
        price_change_24: {
            type: dataTypes.FLOAT,
            allowNull: true,
        },
        supply: {
            type: dataTypes.BIGINT(20),
            allowNull: true,
            get() {
                const value = this.getDataValue("supply");
                return value === null ? null : Number(value);
            },
        },
        mcap: {
            type: dataTypes.BIGINT(20),
            allowNull: true,
            get() {
                const value = this.getDataValue("mcap");
                return value === null ? null : Number(value);
            },
        },
        logo: {
            type: dataTypes.STRING(255),
            defaultValue: "/img/assets/default_logo.svg",
            allowNull: false,
        },
        type_id: {
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
        tableName: 'assets'
    };
    const Asset = sequelize.define(alias, cols, config);

    Asset.associate = function (models) {
        Asset.hasMany(models.Transaction, {
            as: "transactionInput",
            foreignKey: "input_asset_id",
        });
        Asset.hasMany(models.Transaction, {
            as: "transactionOutput",
            foreignKey: "output_asset_id",
        });
        Asset.belongsTo(models.Type, {
            as: "type",
            foreignKey: 'type_id'
        });
        Asset.belongsToMany(models.User, {
            as: "users",
            through: models.AssetUser,
            foreignKey: "asset_id",
            otherKey: "user_id",
            timestamps: false,
            onDelete: 'CASCADE',
        });
    };
    return Asset;
};
