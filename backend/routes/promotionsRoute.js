import express from 'express';
import PromotionsController from '../controllers/promotionsController.js'; // Import the controller

const router = express.Router();

// Define routes using the controller methods

// GET route to fetch all promotions
router.get('/', PromotionsController.getAllPromotions);

// POST route to create a new promotion
router.post('/', PromotionsController.createPromotion);

// PUT route to update an existing promotion
router.put('/:id', PromotionsController.updatePromotion);

// DELETE route to delete a promotion
router.delete('/del/:id', PromotionsController.deletePromotion);

export default router;
