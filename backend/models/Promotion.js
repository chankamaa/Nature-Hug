import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema({
    promotionName: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    promoCode: {
        type: String,
        required: true,
        unique: true
    },
    startDate: {
        type:Date,
        required: true

    },
    endDate: {
        type: Date,
        required: true
    },
    applicableProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
    }]
});

const Promotion = mongoose.models.promotion || mongoose.model("Promotion", promotionSchema);

export default Promotion;
