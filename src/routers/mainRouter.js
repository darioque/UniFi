const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');

router.get('/', mainController.index);
router.get('/login', mainController.login);
router.get('/register', mainController.register);

router.get('/createProduct', productController.create);
router.get('/upgradeProduct', productController.update);
router.get('/deleteProduct', productController.delete);

module.exports = router;