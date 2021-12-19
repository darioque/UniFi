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
    // guardamos los errores en una variable
    const errors = validationResult(req);
    // si hubo errores (la variable NO está vacía) mandarle los mensajes a la vista del formulario
    if (!errors.isEmpty()) {
      return res.render("users/register", {
        pageTitle: "Register",
        old: req.body,
        errorMessages: errors.mapped(),
      });
    }
    // añade el file al req.body para tenerlo todo en un objeto
    req.body.file = req.file
    // si no hubo errores en el formulario, intentar agregar el usuario a la base de datos
    // si el email utilizado ya existia en la base de datos, retornar el sitio de registro con mensaje de error
    // si no hay errores, redireccionar a login
    if (!userService.addUser(req.body)) {
      return res.render("users/register", {
        pageTitle: "Register",
        old: req.body,
        errorMessages: [{ msg: "Email already registered" }],
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
      res.cookie("rememberMe", user.id, { maxAge: 60000 });
    }

    // si hay una url a redireccionar, llevarlo ahi al loguearse
    if (req.session.redirectUrl) {
      res.redirect(req.session.redirectUrl);
    } else {
      res.redirect("/");
    }
  },
  // funcion para cerrar sesión
  logout: function (req, res) {
    req.session.destroy();
    res.redirect("/");
  },
};

module.exports = mainController;
