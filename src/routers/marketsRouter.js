const express = require("express");
const router = express.Router();
const marketsController = require("../controllers/marketsController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", marketsController.markets);
router.get("/:marketType", marketsController.list);
router.get("/:marketType/create", authMiddleware, marketsController.create);
router.post("/", authMiddleware, marketsController.store);
router.get("/:marketType/:asset/", marketsController.detail);
router.post("/:marketType/search", marketsController.search);
router.get("/:marketType/:asset/edit", authMiddleware, marketsController.edit);
router.put("/:marketType/:asset/", authMiddleware, marketsController.update);
router.delete("/:marketType/:asset/delete", authMiddleware, marketsController.delete);

module.exports = router;
