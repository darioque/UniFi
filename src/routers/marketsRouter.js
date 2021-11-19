const express = require('express');
const router = express.Router();
const marketsController = require('../controllers/marketsController');

router.get('/', marketsController.markets);
router.get('/:marketType', marketsController.type);
router.get('/:marketType/:asset', marketsController.detail);
router.get('/:marketType/:asset/trade-confirmation', marketsController.tradeConfirmation);
router.post(
  "/:marketType/:asset/trade-confirmation",
  marketsController.tradeConfirmation
);

module.exports = router;