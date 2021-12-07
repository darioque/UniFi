const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const usersJSON = fs.readFileSync(path.join(__dirname, "../data/users.json"));
const userList = JSON.parse(usersJSON);
const usersFilePath = path.join(__dirname, "../data/users.json");

// funcion para devolver la lista completa de usuarios
function getUsers() {
    return userList;
}

function addUser(newUser) {
    // agrega el nuevo usuario a la lista
    const userList = this.getUsers();
    const currentLastIdNumber = userList[userList.length - 1].id + 1
    newUser.id = currentLastIdNumber
    userList.push(newUser);

    // transforma la lista en formato JSON
    const updatedJSON = JSON.stringify(userList);
    // escribe el array actualizado al JSON
    fs.writeFileSync(usersFilePath, updatedJSON, "utf-8");
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
    const user = userList.find((user) => user.id === userID);
    return user;
}
// funcion para autenticar un usuario especifico y devolverlo
function authenticate(userToAuthenticate) {
    const userList = this.getUsers();
    user = userList.find(
        (user) =>
            user.email === userToAuthenticate.email &&
            bcrypt.compareSync(userToAuthenticate.password, user.password)
    );
    return user;
}

function editUser(userToEdit) {}

function deleteUser(userToDelete) {}

module.exports = {
    getUsers,
    authenticate,
    addUser,
    findUser,
    findUserByPk,

};
