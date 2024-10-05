import express from 'express';
import { getCart, getAllCarts, addItemToCart, updateCartStatus, removeItemFromCart } from '../controllers/cartController.js';

const router = express.Router();

// Route to get all carts
router.get('/', getAllCarts);  // This fetches all carts

// Route to get a specific user's cart by userId
router.get('/:userId', getCart);

// Add item to cart
router.post('/add', addItemToCart);


// Update cart status
router.patch('/status', updateCartStatus);


// Remove item from cart
router.delete('/remove', removeItemFromCart);

export default router;
