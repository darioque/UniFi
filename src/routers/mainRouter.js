const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { body } = require("express-validator");
const mainController = require("../controllers/mainController");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const rememberMeMiddleware = require("../middlewares/rememberMeMiddleware");

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
        .withMessage("Invalid Password (minimum length is 6 and max length is 15"),
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

router.post(
    "/register",
    uploadFile.single("avatar"),
    registerValidations,
    mainController.processRegister
);
router.post("/login", mainController.processLogin);
module.exports = router;
