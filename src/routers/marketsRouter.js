const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const path = require("path")
const multer = require("multer");
const marketsController = require("../controllers/marketsController");

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

router.get("/create", marketsController.createForm);
router.post("/create", uploadFile.any(),  marketsController.store);

router.get("/edit/:id", marketsController.editForm);
router.put("/edit/:id", marketsController.edit);

router.get("/delete", marketsController.deleteOne);
router.delete("/delete", marketsController.delete);

// router.post("/", authMiddleware, uploadFile.single('logo'), marketsController.store);

// router.get("/:marketType", marketsController.list);
// router.get("/:marketType/create", authMiddleware, marketsController.create);

// router.get("/:marketType/:asset/", marketsController.detail);
// router.get("/:marketType/:asset/edit", authMiddleware, marketsController.edit);
// router.put("/:marketType/:asset/", authMiddleware, uploadFile.single('logo'), marketsController.update);
// router.delete("/:marketType/:asset/delete", authMiddleware, marketsController.delete);

module.exports = router;
