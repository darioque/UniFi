const { validationResult } = require("express-validator");
const assetService = require("../services/assets");
const userService = require("../services/users");

const mainController = {
    index: function (req, res) {
        res.render("home/index", {
            pageTitle: "UniFi - Home",
            cryptoList: assetService.getCrypto(),
            stockList: assetService.getStock(),
            user: req.session.authenticatedUser,
        });
    },
    login: function (req, res) {
        res.render("users/login", {
            pageTitle: "Log in",
        });
    },
    register: function (req, res) {
        res.render("users/register", {
            pageTitle: "Register",
        });
    },
    store: (req, res) => {
        // guardamos los errores en una variable
        const errors = validationResult(req);
        // si hubo errores (la variable NO está vacía) mandarle los mensajes a la vista del formulario
        if (!errors.isEmpty()) {
            return res.render("users/register", {
                errorMessages: errors.mapped(),
                old: req.body,
                pageTitle: "Register",
            });
        }

        
        // si no hubo errores en el formulario, intentar agregar el usuario a la base de datos
        // si el email utilizado ya existia en la base de datos, retornar el sitio de registro con mensaje de error
        // si no hay errores, redireccionar a login
        if (userService.addUser(req.body) == -1) {
            return res.render("users/register", {
                errorMessages: [{ msg: "There already exists an account with this email" }],
            });
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

        // autentica al usuario y lo guarda en la variable user
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
            res.cookie('rememberMe', user.id, { maxAge: 60000})
        }
        res.redirect("/");
    },
};

module.exports = mainController;
