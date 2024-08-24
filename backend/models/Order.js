// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            product: {
                name: String,
                price: Number,
                image: String,
            },
            quantity: Number,
        }
    ],
    totalPrice: Number,
    deliveryAddress: {
        firstName: String,
        lastName: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        phone: String,
    },
    status: { type: String, default: 'Order Placed' },
    orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
