const userService = require("../services/users");

const usersController = {
    // funcion controladora para renderizar el listado de usuarios
    list: function (req, res) {
        res.render("users/userList", {
            pageTitle: "UniFi - Users",
            userList: userService.getUsers(),
        });
    },
    // funcion controladora para renderizar el perfil de usuario
    profile: function (req, res) {
        const user = req.session.authenticatedUser;
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
    update: function (req, res) {
        req.body.id = req.session.authenticatedUser.id;
        req.body.avatar = "/img/users/" + req.file.filename;
        userService.updateUser(req.body);
        res.redirect("/users/profile");
    },
};

module.exports = usersController;
