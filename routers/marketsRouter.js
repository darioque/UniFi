const express = require('express');
const router = express.Router();
const marketsController = require('../controllers/marketsController');

router.get('/', marketsController.markets);
router.get('/:marketType', marketsController.type);
router.get('/:marketType/:detail', marketsController.detail);

module.exports = router;