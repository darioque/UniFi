const express = require('express');
const router = express.Router();
const marketsController = require('../controllers/marketsController');

router.get('/', marketsController.markets);
router.get('/:marketType', marketsController.type);
router.get('/:marketType/:asset', marketsController.detail);
router.post(
  "/:marketType/:asset/trade-confirmation",
  marketsController.tradeConfirmation
);

module.exports = router;