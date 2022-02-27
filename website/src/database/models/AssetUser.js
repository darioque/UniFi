module.exports = (sequelize, dataTypes) => {
    let alias = "AssetUser";
    let cols = {
        amount: {
            type: dataTypes.DECIMAL(24, 12),
            allowNull: false,
            get() {
                const value = this.getDataValue("amount");
                return value === null ? null : Number(value);
            },
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            foreignKey: true,
        },
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        asset_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            foreignKey: true,
        },
    };
    let config = {
        timestamps: false,
        deletedAt: false,
        tableName: 'assets_users'
    };
    const AssetUser = sequelize.define(alias, cols, config);
    return AssetUser;
};
