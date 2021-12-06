const fs = require("fs");
const path = require("path");
const usersJSON = fs.readFileSync(
    path.join(__dirname, "../data/users.json")
);
const userList = JSON.parse(usersJSON);

// funcion para devolver la lista completa de usuarios
function getUsers() {
    return userList
}

// funcion para autenticar un usuario especifico y devolverlo
function authenticate(userToAuthenticate) {
    for (const user of userList) {
        if (user.email == userToAuthenticate.email) {
            if (user.password == userToAuthenticate.password) {
                return user;
            }
        }
    }
}

module.exports = {
    getUsers,
    authenticate
}