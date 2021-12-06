const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const mainController = require("../controllers/mainController");
const logDBMiddleware = require("../middlewares/logDBMiddleware");
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

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
    .withMessage("Invalid Password (minimum length is 6 and max length is 15"),
];

router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/register", guestMiddleware, mainController.register);
// cuenta visitas con session (test)
router.get("/pruebaSession", function (req, res) {
    if (req.session.numeroVisitas == undefined) {
        req.session.numeroVisitas = 0;
    }
    req.session.numeroVisitas++;
    res.send("Session tiene el numero: " + req.session.numeroVisitas);
});
// con middleware de ruta
router.post(
  "/register",
  logDBMiddleware,
  validateCreateForm,
  mainController.store
);
router.post(
  "/login",
  logDBMiddleware,
  validateCreateForm,
  mainController.processLogin
);


module.exports = router;
