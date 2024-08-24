// controllers/orderController.js
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const { userId } = req.params;
    const { items, totalPrice, deliveryAddress } = req.body;

    const order = new Order({
        user: userId,
        items,
        totalPrice,
        deliveryAddress,
    });

    await order.save();

    res.status(201).json(order);
};

exports.getOrder = async (req, res) => {
    const order = await Order.findById(req.params.orderId).populate('user');
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};
