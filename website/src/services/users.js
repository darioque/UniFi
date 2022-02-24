const fs = require("fs");
const db = require("../database/models");
const Op = db.Sequelize.Op
const path = require("path");
const bcrypt = require("bcryptjs");
const jdenticon = require("jdenticon");
const crypto = require("crypto");
const avatarsFilePath = path.join(__dirname, "../../public/img/users/");


async function generateId() {
    const count = await db.User.count();
    return count + 1
}


async function getUsers() {
    try {
        const users = await db.User.findAll()
        return users
    } catch (err) {
        console.error("there was an error getting all the users: ", err)
    }
}

async function getWalletAssets(userId) {
    try {
        const user = await db.User.findByPk(userId, {
            include: [{ association: "assets" }],
        });
        return user;
    } catch (err) {
        console.log(err);
        res.status(404).render("not-found");
    }
}

async function createUser(userRequested) {
    try {
        let create;
        if (userRequested.address) {
            create = await db.User.create({
                ...userRequested,
                id: await generateId(),
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
        }
        return create;
    } catch (error) {
        console.error(
            `%cthere was an error creating the user: ${error}`,
            "color: red"
        );
    }
}

// funcion para buscar y devolver un usuario a partir de algun campo a determinar como parametro
async function findUser(field, text) {
    try {
        const user = await db.User.findOne({
            where: {
                [field]: text,
            },
        });
        return user;
    } catch (err) {
        console.error(err);
    }
}

// funcion para autenticar un usuario especifico y devolverlo
async function authenticate(userData) {
    if (userData.address) {
        try {
            const user = await this.findUser("address", userData.address);
            return user;
        } catch (err) {
            console.error("there was an error while authenticating user with address: ", err);
        }
    }
    try {
        const userToCheck = await db.User.findOne({
            where: {
                [Op.or]: [{
                    user_name: userData.user_name??'@'
                },{
                    email: userData.email??'x'
                }]
            }
        })
        const user = userToCheck
            ? bcrypt.compareSync(userData.password, userToCheck.password)
                ? userToCheck
                : null
            : userToCheck;
        return user;
    } catch (err) {
        console.error("there was an error authenticating user with email: ", err);
    }
}

async function updateUser(userData) {
    if (userData.address) {
        try {
            const user = await db.User.update({
                user_name: userData.user_name,
                avatar: userData.avatar,
            }, {
                where: { 
                    id: userData.id
                }
            })
            return user
        } catch (err) {
            console.error("there was an error updating crypto-user: ", err);
        }
    } else {
        try {
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
        } catch (err) {
            console.error("there was an error updating crypto-user: ", err);
        }
    }
}

// funcion para borrar un usuario a partir de su ID
async function deleteUser(userId) {
    try {
        const user = await db.User.destroy({
            where: {
                id: userId,
            },
        });
        return user
    } catch (err) {
        console.error("there was an error trying to delete user: ", err);
    }
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
    getWalletAssets,
    authenticate,
    createUser,
    findUser,
    deleteUser,
    updateUser,
    getUsers,
};
