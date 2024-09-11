import mongoose from 'mongoose';

// Define the Cart schema
const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        itemID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item', // Assuming you have an Item model
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    }]
}, { timestamps: true });

// Create the Cart model
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
