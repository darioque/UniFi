const express = require("express");
const router = express.Router();
const marketsController = require("../controllers/marketsController");
const path = require("path");
const multer = require("multer");
const { body } = require('express-validator');
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const assetService = require("../services/assets");

// implementando multer para logos de activos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/img/assets");
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_logo${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});

const uploadFile = multer({ storage });

// validaciones de formulario de edicion de producto
const editFormValidations = [
    body("id")
        .notEmpty()
        .withMessage("There needs to be an ID")
        .bail()
        .isInt()
        .withMessage("ID needs to be an integer")
        .custom(async (value) => {
            return (await assetService.findAsset(value)) == null;
        })
        .withMessage("ID does not correspond to an asset in our database"),

    body("name")
        .notEmpty()
        .withMessage("There needs to be a name for the asset")
        .bail()
        .isLength({ max: 40 })
        .withMessage("Invalid name. 40 characters max"),

    body("type_id")
        .notEmpty()
        .withMessage("There needs to be a type_id for the asset")
        .bail()
        .isIn([1, 2])
        .withMessage("Invalid type_id"),
    
    body('ticker')
        .notEmpty()
        .withMessage('There needs to be a ticker for the asset')
        .bail()
        .isLength({ max: 10 })
        .withMessage('Invalid ticker. Max length is 10'),

    body('price')
        .isNumeric()
        .withMessage('Invalid price. Must be a number'),
    
    body('price_change_24')
        .isNumeric()
        .withMessage('Invalid price change. Must be a number'),
    
    body('supply')
        .isNumeric()
        .withMessage('Invalid supply. Must be a number'),
    
    body('mcap')
        .isNumeric()
        .withMessage('Invalid mcap. Must be a number'),
    
    body('description')
        .isLength({max: 255})
        .withMessage('Invalid description. Max characters 255')

];

router.get("/", marketsController.markets);
router.post(
    "/:marketType/",
    adminMiddleware,
    uploadFile.single("logo"),
    marketsController.store
);

router.get("/:marketType", marketsController.list);
router.get("/:marketType/create", adminMiddleware, marketsController.create);

router.get("/:marketType/:id/", marketsController.detail);

router.post("/:marketType/", authMiddleware, marketsController.transaction);

router.get("/:marketType/edit/:id", adminMiddleware, marketsController.edit);

router.put(
    "/:marketType/:id",
    adminMiddleware,
    uploadFile.single("logo"),
    editFormValidations,
    marketsController.update
);

router.delete("/:marketType/:id/", adminMiddleware, marketsController.delete);

module.exports = router;
