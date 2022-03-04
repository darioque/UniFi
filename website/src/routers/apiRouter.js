const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const authMiddleware = require("../middlewares/authMiddleware");
const path = require("path");

router.get("/markets/", apiController.listAllAssets);
router.get("/markets/types", apiController.listTypes);
router.get("/transactions", apiController.listTransactions);
router.get("/markets/:id", apiController.assetDetail);
router.get('/users', apiController.listUsers);
router.get('/users/:id', apiController.userDetail);



module.exports = router;
