module.exports = (sequelize, dataTypes) => {
    let alias = "User";
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
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: true,
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: true,
        },
        user_name: {
            type: dataTypes.STRING(20),
            allowNull: true,
        },
        address: {
            type: dataTypes.CHAR(42),
            allowNull: true,
        },
        email: {
            type: dataTypes.STRING(255),
            allowNull: true,
        },
        password: {
            type: dataTypes.CHAR(60),
            allowNull: true,
        },
        avatar: {
            type: dataTypes.STRING(255),
            allowNull: false,
            defaultValue: '/img/users/default_avatar.svg'
        },
    };
    let config = {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false,
        tableName: 'users'
    };
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsToMany(models.Asset, {
            as: "assets",
            through: models.AssetUser,
            foreignKey: "user_id",
            otherKey: "asset_id",
            timestamps: false,
        });
        User.hasMany(models.Transaction, {
            as: 'transactions',
            foreignKey: 'user_id',
        })
    };

    return User;
};
