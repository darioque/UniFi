const express = require('express');
const router = express.Router();
const marketsController = require('../controllers/marketsController');

router.get('/', marketsController.markets);
router.get('/:marketType', marketsController.type);
router.get('/:marketType/:detail', marketsController.detail);
router.get('/:marketType/:detail/trade-confirmation', marketsController.tradeConfirmation);

module.exports = router;