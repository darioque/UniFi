const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const usersJSON = fs.readFileSync(path.join(__dirname, "../data/users.json"));
const usersList = JSON.parse(usersJSON);
const usersFilePath = path.join(__dirname, "../data/users.json");

// funcion para devolver la lista completa de usuarios
function getUsers() {
    return usersList;
}

// funcion que genera el ID a utilizar a partir del ultimo de la lista
function generateId() {
    const userList = this.getUsers();
    const lastUser = userList[userList.length - 1];
    if (lastUser) {
        return lastUser.id + 1;
    }
    return 1;
}

function addUser(userData) {
    // guarda la lista completa de usuarios en una variable
    const userList = this.getUsers();
    let newUser = {};
    // chequear que no exista el usuario en la base de datos
    if (
        userList.find(
            (user) =>
                (user.email && user.email == userData.email) ||
                (user.address && user.address == userData.address)
        )
    ) {
        return false;
    }
    // devuelve el id a utilizar
    const newUserId = this.generateId();

    // si no es registro con wallet guardar al usuario de esta manera
    if (!userData.address) {
        newUser = {
            id: newUserId,
            email: userData.email,
            password: bcrypt.hashSync(userData.password, 10),
            avatar: userData.avatar,
        };
        // si es con wallet guardarlo de esta otra manera
    } else {
        newUser = {
            id: newUserId,
            address: userData.address,
            avatar: "/img/users/default_avatar.png",
        };
    }
    // agrega el nuevo usuario a la lista
    userList.push(newUser);
    // transforma la lista en formato JSON
    const updatedJSON = JSON.stringify(userList, null, 4);
    // escribe el array actualizado al JSON
    fs.writeFileSync(usersFilePath, updatedJSON, null, " ");
    return newUser;
}

// funcion para buscar y devolver un usuario a partir de algun campo a determinar como parametro
function findUser(field, text) {
    const userList = this.getUsers();
    const user = userList.find((user) => user[field] === text);
    return user;
}

// funcion para buscar y devolver un usuario a partir de su ID
function findUserByPk(userID) {
    const userList = this.getUsers();
    const user = userList.find((user) => user.id == userID);
    return user;
}

// funcion para autenticar un usuario especifico y devolverlo
function authenticate(userData) {
    const userList = this.getUsers();
    const user = userList.find(
        (user) =>
            user.address == userData.address ||
            (user.email === userData.email &&
                bcrypt.compareSync(userData.password, user.password))
    );
    return user;
}

function updateUser(userData) {
    const userList = this.getUsers();
    userIndex = userList.findIndex((user) => user.id == userData.id);
    if (!userData.address) {
        userList[userIndex] = {
            id: userData.id,
            email: userData.email,
            password: bcrypt.hashSync(userData.password, 10),
            avatar: userData.avatar,
        };
    } else {
        userList[userIndex] = {
            id: userData.id,
            address: userData.address,
            avatar: userData.avatar,
        };
    }

    const updatedJSON = JSON.stringify(userList, null, 4);
    fs.writeFileSync(usersFilePath, updatedJSON, "utf-8");
}

// funcion para borrar un usuario a partir de su ID
function deleteUser(userId) {
    const userList = this.getUsers();
    const filteredUserList = userList.filter((user) => user.id != userId);
    const updatedJSON = JSON.stringify(filteredUserList, null, 4);
    // escribe el array actualizado al JSON
    fs.writeFileSync(usersFilePath, updatedJSON, null, " ");
}

module.exports = {
    getUsers,
    authenticate,
    addUser,
    findUser,
    findUserByPk,
    generateId,
    deleteUser,
    updateUser,
};
