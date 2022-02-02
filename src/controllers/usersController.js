// se importan las bases de datos
const db = require("../database/models");
// se importa el servicio de usuarios
const userService = require("../services/users");

const usersController = {
    // funcion controladora para renderizar el listado de usuarios
    list: async function (req, res) {
        res.render("users/userList", {
            pageTitle: "UniFi - Users",
            userList: userService.getUsers(),
        });
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
    update: function (req, res) {
        req.body.id = req.session.authenticatedUser.id;
        req.body.avatar = "/img/users/" + req.file.filename;
        userService.updateUser(req.body);
        res.redirect("/users/profile");
    },
    
    wallet: async function (req, res) {
        const userId = req.session.authenticatedUser.id
        try {
            const user = await db.User.findByPk(userId, {
                include: [{ association: 'assets' }],
            });
            const assetList = user.assets
            res.render('users/wallet', {assetList})
        } catch (err) {
            console.log(err)
            res.status(404).render("not-found");
        }
    },
    list: async function (req, res) {
    const assetList = await db.Asset.findAll({
        where: {
            type_id: 1,
        },
        limit: 15,
    })
    res.status(200).json({
        meta: {
            status: 200,
            count: assetList.length
        },
        data: assetList
    })
},
};

module.exports = usersController;
