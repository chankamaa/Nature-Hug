// models/Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            product: {
                name: String,
                price: Number,
                image: String,
            },
            quantity: { type: Number, default: 1 },
        }
    ],
    totalPrice: Number,
});

module.exports = mongoose.model('Cart', CartSchema);
