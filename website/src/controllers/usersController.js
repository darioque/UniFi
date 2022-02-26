// se importan las bases de datos
const db = require("../database/models");
// se importa el servicio de usuarios
const userService = require("../services/users");

const usersController = {
    // funcion controladora para renderizar el listado de usuarios
    list: async function (req, res) {
        try {
            const userList = await userService.getUsers()
            res.render("users/userList", {
                pageTitle: "UniFi - Users",
                userList,
            });
        } catch (err) {
            console.error("there was an error getting users in the list function: ", err);
            res.status(404).render("not-found");
        }
    },
    // funcion controladora para renderizar perfiles de usuario
    profile: function (req, res) {
        const userId = req.params.id;
        const user =
            userId != req.session.authenticatedUser.id && userId != undefined
                ? userService.findUserByPk(userId)
                : req.session.authenticatedUser;
        res.render("users/userProfile", {
            pageTitle: "Unifi - User Profile",
            user,
        });
    },
    // funcion controladora para renderizar el formulario de edicion de usuario
    edit: function (req, res) {
        const user = req.session.authenticatedUser;
        res.render("users/editUserForm", {
            pageTitle: "UniFi - Edit User",
            user,
        });
    },
    // funcion controladora para procesar los nuevos datos de usuario
    update: async function (req, res) {
        req.body.id = req.session.authenticatedUser.id;
        if (req.file) {
            req.body.avatar = "/img/users/" + req.file.filename;
        }
        try {
            await userService.updateUser(req.body);
            res.redirect("/users/profile");
        } catch (err) {
            console.error("There was an error updating user: ", err)
            res.status(404).render("not-found");
        }
    },

    wallet: async function (req, res) {
        const userId = req.session.authenticatedUser.id;
        try {
            const user = await userService.getWalletAssets(userId);
            const walletAssets = user.assets
            res.render("users/wallet", { walletAssets });
        } catch (err) {
            console.error(err);
            res.status(404).render("not-found");
        }
    },

    delete: async function (req, res) {
        try {
            const userId = req.session.authenticatedUser.id;
            const user = await userService.deleteUser(userId);
            req.session.destroy();
            res.redirect("/login");
        } catch (err) {
            console.error("there was an error deleting the user: ", err);
            res.status(404).render("not-found");
        }
    },
};

module.exports = usersController;
