module.exports = (sequelize, dataTypes) => {
    let alias = "Type";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
    };
    let config = {
        timestamps: false,
        deletedAt: false,
        tableName: 'types'
    };
    const Type = sequelize.define(alias, cols, config);

    Type.associate = function (models) {
        Type.hasOne(models.Asset, {
            as: "asset",
            foreignKey: "type_id",
        });
    };

    return Type;
};
