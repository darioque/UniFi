const express = require("express");
const router = express.Router();
const marketsController = require("../controllers/marketsController");

router.get("/", marketsController.markets);
router.get("/:marketType", marketsController.list);
router.get("/:marketType/create", marketsController.create);
router.post("/", marketsController.store);
router.get("/:marketType/:asset/", marketsController.detail);
router.post("/:marketType/search", marketsController.search);
router.get("/:marketType/:asset/edit", marketsController.edit);
router.put("/:marketType/:asset/", marketsController.update);
router.delete("/:marketType/:asset/delete", marketsController.delete);

module.exports = router;
