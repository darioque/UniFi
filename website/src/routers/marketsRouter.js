const express = require("express");
const router = express.Router();
const marketsController = require("../controllers/marketsController");
const authMiddleware = require("../middlewares/authMiddleware");
const path = require("path");
const multer = require("multer");
const adminMiddleware = require("../middlewares/adminMiddleware");

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
router.post(
    "/",
    authMiddleware,
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
    marketsController.update
);

router.delete("/:marketType/:id/", adminMiddleware, marketsController.delete);

module.exports = router;
