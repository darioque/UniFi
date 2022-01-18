const { validationResult } = require("express-validator");
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
    processRegister: (req, res) => {
        // guarda los errores en una variable
        const errors = validationResult(req);
        console.log(req.body)
        // si hubo errores (la variable NO está vacía) mandarle los mensajes a la vista del formulario
        if (!errors.isEmpty()) {
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
        // si no hubo errores en el formulario, intentar agregar el usuario a la base de datos
        if (!userService.addUser(req.body)) {
            // si el email utilizado ya existia en la base de datos, retornar el sitio de registro con mensaje de error
            return res.render("users/register", {
                pageTitle: "Register",
                old: req.body,
                errorMessages: [{ msg: "Email or address already registered" }],
            });
            // si no hay errores, redireccionar a login
        } else {
            res.redirect("/login");
        }
    },
    // función para procesar autenticacion de usuarios
    processLogin: function (req, res) {
        const errors = validationResult(req);
        // si hubo errores (la variable NO está vacía) mandarle los mensajes a la vista del formulario
        if (!errors.isEmpty()) {
            return res.render("users/login", {
                errorMessages: errors.mapped(),
                old: req.body,
                pageTitle: "Login",
            });
        }

        // autenticar datos de login y guardar al usuario resultante en una variable
        const user = userService.authenticate(req.body);

        // si no se encontró ningun usuario que coincida (credenciales invalidas), devolver el sitio de login con mensaje de error
        if (!user) {
            return res.render("users/login", {
                errorMessages: [{ msg: "Invalid Credentials" }],
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
};

module.exports = mainController;
