const { validationResult } = require("express-validator");
const { unlink } = require("fs/promises");
const path = require("path");
const assetService = require("../services/assets");
const userService = require("../services/users");

const mainController = {
    index: async function (req, res) {
        try {
            const cryptoList = await assetService.getCrypto()
            const stockList = await assetService.getStock()
            res.render("home/index", {
                pageTitle: "UniFi - Home",
                cryptoList,
                stockList
            });
            
        } catch (err) {
            console.error("there was an error retrieving the assets list: ", err)
        }
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
        // si hubo errores (el array no está vacío) mandar los mensajes a la vista del formulario
        if (!errors.isEmpty()) {
            // si hubo errores en registro con foto de perfil, borrarla
            if (req.file) {
                try {
                    await unlink(path.resolve(__dirname, `../../${req.file.path}`));
                    console.log("Successfully deleted pfp");
                } catch (error) {
                    console.error("There was an error deleting the image: ", error);
                }
            }
            // renderizar vista de registra con los respectivos errores
            return res.render("users/register", {
                pageTitle: "Register",
                old: req.body,
                errorMessages: errors.mapped(),
            });
        }
        // añade la url de la foto de perfil a una propiedad avatar del body para tenerlo todo en un objeto
        if (req.file) {
            req.body.avatar = "/img/users/" + req.file.filename;
        }
        // si no hubo errores en el formulario, registrar al usuario en la base de datos
        try {
            await userService.createUser(req.body);
            res.redirect("/login");

        } catch (err) {
            console.error("There was an error creating the user: ", err)
        }
    },
    // función para procesar autenticacion de usuarios
    processLogin: async function (req, res) {
        // guarda los errores en una variable
        const errors = validationResult(req);
        // si hubo errores (el array no está vacío) mandar los mensajes a la vista del formulario
        if (!errors.isEmpty()) {
            // renderizar vista de login con los respectivos errores
            return res.render("users/login", {
                pageTitle: "Log in",
                old: req.body,
                errorMessages: errors.mapped(),
            });
        }
        // autenticar datos de login y guardar al usuario resultante en una variable
        try {
            const user = await userService.authenticate(req.body);
            // si no se encontró ningun usuario que coincida (credenciales invalidas), devolver el sitio de login con mensaje de error
            if (!user) {
                return res.render("users/login", {
                    errorMessages: [{ msg: "Invalid credentials" }],
                });
            }
            // si no hubo errores, guardar al usuario autenticado con session y redirigir a home
            const adminIds = [98, 99, 100, 101, 102];
            req.session.authenticatedUser = user.dataValues;
            if (adminIds.includes(req.session.authenticatedUser.id)) {
                req.session.authenticatedUser.admin = true;
            }
            // si está tildado el campo de remember me, guardarlo con cookie
            if (req.body.remember) {
                res.cookie("rememberMe", user.id, { maxAge: 60000 });
            }

            // si hay una url a redireccionar (y no es logout), llevarlo ahi al loguearse
            if (
                req.session.redirectUrl &&
                req.session.redirectUrl != "/logout"
            ) {
                res.redirect(req.session.redirectUrl);
            } else {
                res.redirect("/");
            }
        } catch (err) {
            console.error("there was an erro authenticating the user: ", err);
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
        const searchUser = req.body.email;
        const field = searchUser.includes('@')?'email':'user_name'
        const user = await userService.findUser(field, searchUser);
        res.redirect('/login')
    },
};

module.exports = mainController;
