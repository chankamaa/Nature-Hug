import express from 'express';
import { getCart, addItemToCart, updateCartItem, removeItemFromCart } from '../controllers/cartController.js';

const router = express.Router();

// Get cart for a user
router.get('/:userId', getCart);

// Add or update cart for a user
router.post('/add', addItemToCart);

// Update item quantity in cart
router.put('/update', updateCartItem);

// Remove an item from the cart
router.delete('/remove', removeItemFromCart);

export default router;
