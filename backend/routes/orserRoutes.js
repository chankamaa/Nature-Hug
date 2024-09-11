import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder,verifyOrder,getUserOrders } from '../controllers/orderController.js';


const orderRoutes = express.Router();

orderRoutes.post('/place',authMiddleware,placeOrder);
orderRoutes.post('/verify',verifyOrder)
orderRoutes.post("/userorders",authMiddleware,getUserOrders)


export default orderRoutes;
