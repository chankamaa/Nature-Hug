import Promotion from '../models/Promotion.js';
import mongoose from 'mongoose';

class PromotionsController {
    // Fetch all promotions
    static async getAllPromotions(req, res) {
        try {
            const promotions = await Promotion.find();
            res.json(promotions);
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Create a new promotion
    static async createPromotion(req, res) {
        const { promotionName, discountPercentage, promoCode, startDate, endDate, applicableProducts } = req.body;

        try {
            const newPromotion = new Promotion({
                promotionName,
                discountPercentage,
                promoCode,
                startDate,
                endDate,
                applicableProducts
            });

            await newPromotion.save();
            res.status(201).json(newPromotion);
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Update an existing promotion
    static async updatePromotion(req, res) {
        const { id } = req.params;
        const { promotionName, discountPercentage, promoCode, startDate, endDate, applicableProducts } = req.body;

        try {
            const promotion = await Promotion.findById(id);

            if (!promotion) {
                return res.status(404).json({ message: 'Promotion not found' });
            }

            promotion.promotionName = promotionName || promotion.promotionName;
            promotion.discountPercentage = discountPercentage || promotion.discountPercentage;
            promotion.promoCode = promoCode || promotion.promoCode;
            promotion.startDate = startDate || promotion.startDate;
            promotion.endDate = endDate || promotion.endDate;
            promotion.applicableProducts = applicableProducts || promotion.applicableProducts;

            const updatedPromotion = await promotion.save();
            res.json(updatedPromotion);
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Delete a promotion
    static async deletePromotion(req, res) {
        const { id } = req.params;
    
        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid promotion ID' });
        }
    
        try {
            const promotion = await Promotion.findByIdAndDelete(id);
    
            if (!promotion) {
                return res.status(404).json({ message: 'Promotion not found' });
            }
    
            res.json({ message: 'Promotion removed' });
        } catch (err) {
            console.error('Error occurred while deleting promotion:', err);
            res.status(500).json({ message: 'Server error' });
        }
    }
    
    
}

export default PromotionsController;