const express = require("express");
const router = express.Router();
const multer = require('multer')
const path = require('path')
const { body } = require("express-validator");
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");
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


const editUserValidations = [
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
        .custom(async (email, { req }) => {
            const user = await userService.findUser("email", email);
            if (user && user.id != req.session.authenticatedUser.id) {
                throw new Error("E-mail already in use");
            }
            return;
        }),

    body("user_name")
        .if((value, { req }) => {
            return req.body.address == null;
        })
        .custom(async (user_name, { req }) => {
            const user = await userService.findUser("user_name", user_name);
            if (user && user.id != req.session.authenticatedUser.id) {
                throw new Error("Username already in use");
            }
            return;
        })
        .trim()
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

    body("avatar")
        .if((value, { req }) => {
            return req.body.address == null;
        })
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = [".jpg", ".jpeg", ".png", ".svg"];
            if (file && !acceptedExtensions.includes(path.extname(file.originalname))) {
                throw new Error("Not a valid image file");
            }
            return true;
        }),
];

router.get("/", authMiddleware, usersController.list);
router.get("/profile", authMiddleware, usersController.profile);
router.get("/profile/edit/", authMiddleware, usersController.edit);
router.get('/:id/profile', authMiddleware, usersController.profile)
router.put("/profile/edit/", authMiddleware, uploadFile.single('avatar'), editUserValidations, usersController.update)
router.delete("/profile/edit/", authMiddleware, usersController.delete)
router.get('/wallet', authMiddleware, usersController.wallet)
router.get('/wallet/transactions', authMiddleware, usersController.transactions)

module.exports = router;
