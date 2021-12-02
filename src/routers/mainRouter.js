const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const logDBMiddleware = require("../middlewares/logDBMiddleware");
const { body } = require("express-validator");

// validaciones
const validateCreateForm = [
    body("email")
        .notEmpty()
        .withMessage('You need to set an email')
        .bail()
        .isEmail()
        .withMessage("You need to set a valid email"),
    body("password")
        .notEmpty()
        .withMessage('You need to set a password')
        .bail()
        .isLength({ min: 6, max: 15 })
        .withMessage("You need to set a valid password"),
];

router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/register", mainController.register);
// con middleware de ruta
router.post(
    "/register",
    logDBMiddleware,
    validateCreateForm,
    mainController.store
);

module.exports = router;
