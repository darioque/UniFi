const fs = require("fs");
const db = require("../database/models");
const Op = db.Sequelize.Op;
const path = require("path");
const bcrypt = require("bcryptjs");
const jdenticon = require("jdenticon");
const crypto = require("crypto");
const avatarsFilePath = path.join(__dirname, "../../public/img/users/");

async function generateId(db) {
    const id = await db.max('id');
    return id + 1;
}

async function getUsers() {
    const users = await db.User.findAll();
    return users;
}

async function getWalletBalances(userId) {
    const user = await db.User.findByPk(userId, {
        include: [{
            association: 'assets',
            include: [{
                association: 'type',
            }]
        }]
    })
    return user;
}

async function getWalletTransactions(userId) {
    const user = await db.User.findByPk(userId, {
        include: [
            {
                association: "transactions",
                include: [
                    {
                        association: "input",
                        include: [{ association: "type" }],
                    },
                    {
                        association: "output",
                        include: [{ association: "type" }],
                    },
                ],
            },
        ],
        order: [["created_at", "DESC"]],
    });
    return user;
}

async function createUser(userRequested) {
    let create;
    if (userRequested.address) {
        create = await db.User.create({
            ...userRequested,
            id: await generateId(db.User),
            avatar: generateAvatar(),
        });
    } else {
        create = await db.User.create({
            first_name: userRequested.first_name,
            last_name: userRequested.last_name,
            user_name: userRequested.user_name,
            email: userRequested.email,
            password: bcrypt.hashSync(userRequested.password, 10),
            avatar: userRequested.avatar,
        });
        return create;
    }
}

// funcion para buscar y devolver un usuario a partir de algun campo a determinar como parametro
async function findUser(field, text) {
    const user = await db.User.findOne({
        where: {
            [field]: text,
        },
    });
    return user;
}

// funcion para autenticar un usuario especifico y devolverlo
async function authenticate(userData) {
    if (userData.address) {
        const user = await this.findUser("address", userData.address);
        return user;
    }
    const userToCheck = await db.User.findOne({
        where: {
            [Op.or]: [
                {
                    user_name: userData.user_name ?? "@",
                },
                {
                    email: userData.email ?? "x",
                },
            ],
        },
    });
    const user = userToCheck
        ? bcrypt.compareSync(userData.password, userToCheck.password)
            ? userToCheck
            : null
        : userToCheck;
    return user;
}

async function updateUser(userData) {
    if (userData.address) {
        const user = await db.User.update(
            {
                user_name: userData.user_name,
                avatar: userData.avatar,
            },
            {
                where: {
                    id: userData.id,
                },
            }
        );
        return user;
    } else {
        const user = await db.User.update(
            {
                id: userData.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                user_name: userData.user_name,
                email: userData.email,
                password: bcrypt.hashSync(userData.password, 10),
                avatar: userData.avatar,
            },
            {
                where: {
                    id: userData.id,
                },
            }
        );
        return user;
    }
}

// funcion para borrar un usuario a partir de su ID
async function deleteUser(userId) {
    const user = await this.findUser("id", userId);
    await user.setAssets([]);
    await user.setTransactions([]);
    await user.destroy();
    return user;
}

// funcion para generar un avatar "identicon" a partir de un hash
function generateAvatar() {
    const size = 200;
    const value = crypto.randomBytes(20).toString("hex");
    const svg = jdenticon.toSvg(value, size);
    const fileName = `${Date.now()}_avatar.svg`;
    fs.writeFileSync(`${avatarsFilePath}${fileName}`, svg);
    return `/img/users/${fileName}`;
}

module.exports = {
    getWalletBalances,
    authenticate,
    createUser,
    findUser,
    deleteUser,
    updateUser,
    getUsers,
    getWalletTransactions,
};
