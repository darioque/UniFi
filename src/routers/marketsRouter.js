const express = require("express");
const router = express.Router();
const marketsController = require("../controllers/marketsController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname);
  },
});

const uploadFile = multer({ storage });

router.get("/", marketsController.markets);
router.get("/:marketType", marketsController.list);
router.get("/:marketType/create", authMiddleware, marketsController.create);
router.post("/", authMiddleware, marketsController.store);
router.get("/:marketType/:asset/", marketsController.detail);
router.post("/:marketType/search", marketsController.search);
router.get("/:marketType/:asset/edit", authMiddleware, uploadFile.single('logo'), marketsController.edit);
router.put("/:marketType/:asset/", authMiddleware, marketsController.update);
router.delete("/:marketType/:asset/delete", authMiddleware, marketsController.delete);

module.exports = router;
