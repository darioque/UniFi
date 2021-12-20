const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, usersController.list);
router.get("/profile", authMiddleware, usersController.profile);
router.get("/edit/:id", authMiddleware, usersController.edit);

module.exports = router;
