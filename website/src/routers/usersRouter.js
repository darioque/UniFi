const express = require("express");
const router = express.Router();
const multer = require('multer')
const path = require('path')
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");

// implementando multer para fotos de perfil
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/img/users");
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_avatar${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});

const uploadFile = multer({ storage });

router.get("/", authMiddleware, usersController.list);
router.get("/profile", authMiddleware, usersController.profile);
router.get("/profile/edit/", authMiddleware, usersController.edit);
router.get('/:id/profile', authMiddleware, usersController.profile)
router.put("/profile/edit/", authMiddleware, uploadFile.single('avatar'), usersController.update)
router.delete("/profile/edit/", authMiddleware, usersController.delete)
router.get('/wallet', authMiddleware, usersController.wallet)

module.exports = router;
