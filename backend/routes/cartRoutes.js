import express from 'express'
import { addItemsToCart, getCartItems, removeFromCart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js';


const router = express.Router();

cartRoutes.post('/add',authMiddleware,addItemsToCart);
cartRoutes.post('/remove',authMiddleware, removeFromCart);
cartRoutes.post('/get', authMiddleware, fetchCart);


export default router;