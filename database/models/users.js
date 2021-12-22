module.exports = function (sequelize, dataTypes) {
    const alias = "Users";
    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        email: {
            allowNull: true,
            type: dataTypes.STRING,
        },
        password: {
            allowNull: true,
            type: dataTypes.STRING,
        },
        address: {
            allowNull: true,
            type: dataTypes.STRING,
        },
        avatar: {
            allowNull: false,
            type: dataTypes.STRING,
        },
    };
    const config = {
        tableName: "Users",
        timestamps: false,
    };
    const User = sequelize.define(alias, cols, config);

    return User;
};
