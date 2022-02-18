const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const authMiddleware = require("../middlewares/authMiddleware");
const path = require("path");

router.get("/markets/", apiController.listAssets);
router.get("/markets/types", apiController.listTypes);
router.get("/markets/:marketType", apiController.listTransactions);



module.exports = router;
