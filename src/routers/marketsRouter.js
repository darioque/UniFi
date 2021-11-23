const express = require('express');
const router = express.Router();
const marketsController = require('../controllers/marketsController');

router.get('/', marketsController.markets);
router.get('/:marketType', marketsController.list);
router.get('/:marketType/:asset', marketsController.detail);
router.post('/:marketType/:asset/trade-confirmation', marketsController.tradeConfirmation);
router.post('/:marketType/search', marketsController.search);

module.exports = router;