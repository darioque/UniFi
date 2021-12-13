const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/img/avatars");
  },
  filename: (req, file, cb) => {
    let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});
const uploadFile = multer({ storage });

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
    .withMessage("Invalid Password (minimum length is 6 and max length is 15"),
  body("avatar").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png"];
    if (!file) {
      throw new Error("You need to upload an image");
    } else {
      let fileExtension = path.extname(file.originalname); //no sé por que no me está tomando el file.originalname!
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `The accepted extensions are ${acceptedExtensions.join(", ")}`
        );
      }
    }
  }),
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
  uploadFile.single("avatar"),
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
