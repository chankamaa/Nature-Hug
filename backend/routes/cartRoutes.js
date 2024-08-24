// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');

router.get('/:userId', getCart);
router.post('/:userId', addToCart);
router.put('/:userId/:productId', updateCartItem);
router.delete('/:userId/:productId', removeFromCart);

module.exports = cartrouter;
