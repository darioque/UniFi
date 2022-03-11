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
        cb(null, "./website/public/img/users");
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_avatar${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});

const uploadFile = multer({ storage });

// validaciones de registro
const registerValidations = [
    body("address")
        .if((value, { req }) => {
            return req.body.email == null;
        })
        .custom(async (address) => {
            const user = await userService.findUser("address", address);
            if (user) {
                throw new Error("Address already in use");
            }
            return;
        }),

    body("password")
        .if((value, { req }) => {
            return req.body.address == null;
        })
        .notEmpty()
        .withMessage("You need to set a password")
        .bail()
        .isLength({ min: 8, max: 15 })
        .withMessage(
            "Invalid password. Minimum length is 8 and max length is 15"
        ),

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
        .trim()
        .normalizeEmail()
        .custom(async (email) => {
            const user = await userService.findUser("email", email);
            if (user) {
                throw new Error("E-mail already in use");
            }
            return;
        }),

    body("user_name")
        .if((value, { req }) => {
            return req.body.address == null;
        })
        .trim()
        .custom(async (user_name) => {
            const user = await userService.findUser("user_name", user_name);
            if (user) {
                throw new Error("Username already in use");
            }
            return;
        })
        .customSanitizer((value) => {
            return value === "" ? null : value;
        }),

    body("first_name")
        .if((value, { req }) => {
            return req.body.address == null;
        })
        .notEmpty()
        .withMessage("You need to provide a first name")
        .isLength({ min: 2 })
        .withMessage("Invalid name. Minimum length is 2 characters")
        .trim(),

    body("last_name")
        .if((value, { req }) => {
            return req.body.address == null;
        })
        .notEmpty()
        .withMessage("You need to provide a last name")
        .isLength({ min: 2 })
        .withMessage("Invalid last name. Minimum length is 2 characters")
        .trim(),
        
    body('avatar')
        .if((value, { req }) => {
            return req.body.address == null;
        })
        .custom((value, { req }) => {
            let file = req.file
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.svg']
            if (!file) {
                throw new Error('You need to upload an image')
            }

            if (!acceptedExtensions.includes(path.extname(file.originalname))) {
                throw new Error('Not a valid image file')
            }
            return true;
        })
];

// validaciones de login
const loginValidations = [
    body("email")
        .if((value, { req }) => {
            return req.body.address == null;
        })
        .notEmpty()
        .withMessage("You need to set an email/username")
        .customSanitizer((value, {req}) => {
            if (!value.includes('@')) {
                req.body.user_name = value
                return null
            }
            return value
        })
        .trim(),

    body("password")
        .if((value, { req }) => {
            return req.body.address == null;
        })
        .notEmpty()
        .withMessage("You need to set a password"),
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
router.post("/login", loginValidations, mainController.processLogin);
module.exports = router;
