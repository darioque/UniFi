const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const authMiddleware = require("../middlewares/authMiddleware");
const path = require("path");

router.get("/markets/", apiController.list);
router.get("/markets/types", apiController.types);
router.get("/markets/:marketType", apiController.list);



module.exports = router;
