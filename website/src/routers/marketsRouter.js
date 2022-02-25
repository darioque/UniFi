const express = require("express");
const router = express.Router();
const marketsController = require("../controllers/marketsController");
const authMiddleware = require("../middlewares/authMiddleware");
const path = require('path')
const multer = require("multer");

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

router.get("/", marketsController.markets);
router.post("/", authMiddleware, uploadFile.single('logo'), marketsController.store);

router.get("/:marketType", marketsController.list);
router.get("/:marketType/create", authMiddleware, marketsController.create);

router.get("/:marketType/:asset/", marketsController.detail);

router.post("/:marketType/", marketsController.transaction);

router.get("/:marketType/edit/:id", authMiddleware, marketsController.edit);

router.put("/:marketType/:id", authMiddleware, uploadFile.single('logo'), marketsController.update);

router.delete("/:marketType/:asset/delete", authMiddleware, marketsController.delete);

module.exports = router;
