import express from 'express';
import { getCart, addItemToCart, updateCartItem, removeItemFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/:userId', getCart); // Get cart for a user
router.post('/add', addItemToCart); // Add item to cart
router.put('/update', updateCartItem); // Update item quantity in cart
router.delete('/remove', removeItemFromCart); // Remove item from cart

export default router;
