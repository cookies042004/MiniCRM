const express = require('express');
const router = express.Router();
const { ingestCustomer, ingestOrder } = require('../controllers/dataController');

router.post('/customer', ingestCustomer);
router.post('/order', ingestOrder);

module.exports = router;
