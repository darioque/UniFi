const assetService = require("../services/assets");
const { validationResult } = require("express-validator");

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
        });
    },
    register: function (req, res) {
        res.render("users/register", {
            pageTitle: "Register",
        });
    },
    store: (req, res) => {
        // guardamos los errores en una variable
        let errors = validationResult(req);
        // si hubo errores (la variable NO está vacía) mandarle los mensajes a la vista del formulario
        if (!errors.isEmpty()) {
            return res.render("users/register", {
                errorMessages: errors.mapped(),
                old: req.body,
                pageTitle: "Register",
            });
        }
        res.redirect("/");
    },
};

module.exports = mainController;
