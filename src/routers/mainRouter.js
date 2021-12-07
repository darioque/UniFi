const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const mainController = require("../controllers/mainController");
const logDBMiddleware = require("../middlewares/logDBMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const rememberMeMiddleware = require("../middlewares/rememberMeMiddleware");

// validaciones
const registerValidations = [
    body("email")
        .notEmpty()
        .withMessage("You need to set an email")
        .bail()
        .isEmail()
        .withMessage("Invalid Email"),
    body("password")
        .notEmpty()
        .withMessage("You need to set a password")
        .bail()
        .isLength({ min: 6, max: 15 })
        .withMessage(
            "Invalid Password (minimum length is 6 and max length is 15"
        ),
];

const loginValidations = [
    body("email").notEmpty().withMessage("You need to enter an email").bail(),
    body("password").notEmpty().withMessage("You need to enter a password"),
];

router.get("/", mainController.index);
router.get(
    "/login",
    guestMiddleware,
    rememberMeMiddleware,
    mainController.login
);
router.get("/register", guestMiddleware, mainController.register);
router.get("/logout", mainController.logout);
// con middleware de ruta
router.post(
    "/register",
    logDBMiddleware,
    registerValidations,
    mainController.processRegister
);
router.post(
    "/login",
    logDBMiddleware,
    loginValidations,
    mainController.processLogin
);
module.exports = router;
