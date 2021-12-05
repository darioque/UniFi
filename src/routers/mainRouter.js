const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const logDBMiddleware = require("../middlewares/logDBMiddleware");
const { body } = require("express-validator");
const multer = require("multer");
const uploadFile = multer({ storage });

// seteo de carpeta donde se van a guardar los archivos subidos por los usuarios
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/img/avatars");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
  },
});

// validaciones
const validateCreateForm = [
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
    .withMessage("Invalid Password"),
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
router.post("/register", uploadFile.single("avatar"), usersController.create); //trato de implementar multer

module.exports = router;
