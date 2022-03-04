const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { body } = require("express-validator");
const mainController = require("../controllers/mainController");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const rememberMeMiddleware = require("../middlewares/rememberMeMiddleware");
const userService = require("../services/users");

// implementando multer para fotos de perfil
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/img/users");
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_avatar${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});

const uploadFile = multer({ storage });

// validaciones
const registerValidations = [
    body("password")
        .if((value, { req }) => {
            return req.body.address == null;
        })
        .notEmpty()
        .withMessage("You need to set a password")
        .bail()
        .isLength({ min: 6, max: 15 })
        .withMessage("Minimum length is 6 and max length is 15"),

    body("email")
        .if((value, { req }) => {
            return req.body.address == null;
        })
        .notEmpty()
        .withMessage("You need to set an email")
        .bail()
        .isEmail()
        .withMessage("Invalid Email Address")
        .bail()
        .custom(async (value) => {
            return (await userService.findUser("email", value)) == null;
        })
        .withMessage("E-mail already in use"),

    body("address")
        
        .custom(async (value) => {
            console.log(value);
            return (await userService.findUser("address", value)) == null;
        })
        .withMessage("Address already in use"),
];

router.get("/", mainController.index);
router.get(
    "/login",
    guestMiddleware,
    rememberMeMiddleware,
    mainController.login
);
router.get("/register", guestMiddleware, mainController.register);
router.get("/logout", authMiddleware, mainController.logout);
router.get("/reset-password", guestMiddleware, mainController.resetPassword);
router.post("/login/reset-password", mainController.processResetPassword);

router.post(
    "/register",
    uploadFile.single("avatar"),
    registerValidations,
    mainController.processRegister
);
router.post("/login", mainController.processLogin);
module.exports = router;
