// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { createOrder, getOrder } = require('../controllers/orderController');

router.post('/:userId', createOrder);
router.get('/:orderId', getOrder);

module.exports = router;
