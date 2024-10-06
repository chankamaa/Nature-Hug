import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'User',
    },
    
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'plant',
            },
            name: String,
            image: String,
            price: Number,
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    deliveryFee: {
        type: Number,
        default: 350,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['In Progress', 'Delivered', 'Cancelled'], // Define possible statuses
        default: 'In Progress', // Default status when a new cart is created
    },
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
