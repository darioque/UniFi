module.exports = (sequelize, dataTypes) => {
    let alias = "State";
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
        tableName: 'states'
    };
    const State = sequelize.define(alias, cols, config);

    State.associate = function (models) {
        State.hasOne(models.Asset, {
            as: "asset",
            foreignKey: "state_id",
        });
    };

    return State;
};
