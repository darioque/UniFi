const { validationResult } = require("express-validator");
const { unlink } = require("fs/promises");
const path = require("path");
const assetService = require("../services/assets");
const userService = require("../services/users");

const mainController = {
    index: function (req, res) {
        res.render("home/index", {
            pageTitle: "UniFi - Home",
            cryptoList: assetService.getCrypto(),
            stockList: assetService.getStock(),
        });
    },
    login: function (req, res) {
        res.render("users/login", {
            pageTitle: "Log in",
            old: req.session.rememberMe,
        });
    },
    register: function (req, res) {
        res.render("users/register", {
            pageTitle: "Register",
        });
    },
    processRegister: async (req, res) => {
        // guarda los errores en una variable
        const errors = validationResult(req);
        console.log(errors);
        // si hubo errores (el array no está vacío) mandar los mensajes a la vista del formulario y borrar la imagen subida
        if (!errors.isEmpty()) {
            try {
                await unlink(path.resolve(__dirname, `../../${req.file.path}`));
                console.log("Successfully deleted pfp");
            } catch (error) {
                console.error("There was an error deleting the image: ", error);
            }
            return res.render("users/register", {
                pageTitle: "Register",
                old: req.body,
                errorMessages: errors.mapped(),
            });
        }
        // añade el path de la foto de perfil a una propiedad avatar del body para tenerlo todo en un objeto
        if (req.file) {
            req.body.avatar = "/img/users/" + req.file.filename;
        }
        // si no hubo errores en el formulario, agregar el usuario a la base de datos
        userService.createUser(req.body);
        res.redirect("/login");
    },
    // función para procesar autenticacion de usuarios
    processLogin: function (req, res) {
        // autenticar datos de login y guardar al usuario resultante en una variable
        const user = userService.authenticate(req.body);

        // si no se encontró ningun usuario que coincida (credenciales invalidas), devolver el sitio de login con mensaje de error
        if (!user) {
            return res.render("users/login", {
                errorMessages: [{ msg: "Invalid username or password" }],
            });
        }
        // si no hubo errores, guardar al usuario autenticado con session y redirigir a home
        req.session.authenticatedUser = user;
        // si está tildado el campo de remember me, guardarlo con cookie
        if (req.body.remember) {
            res.cookie("rememberMe", user.id, { maxAge: 60000 });
        }

        // si hay una url a redireccionar (y no es logout), llevarlo ahi al loguearse
        if (req.session.redirectUrl && req.session.redirectUrl != "/logout") {
            res.redirect(req.session.redirectUrl);
        } else {
            res.redirect("/");
        }
    },
    // funcion para cerrar sesión
    logout: function (req, res) {
        req.session.destroy();
        res.redirect("/login");
    },

    resetPassword: function (req, res) {
        res.render("users/resetPassword");
    },
    // funcion para resetear la contraseña de un usuario
    processResetPassword: async function (req, res) {
        searchUser = req.body.email;
        user = userService.findUser(email, searchUser);
    },
};

module.exports = mainController;
