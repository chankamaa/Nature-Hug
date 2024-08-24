// controllers/cartController.js
const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('user');
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
};

exports.addToCart = async (req, res) => {
    const { userId } = req.params;
    const { product, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(item => item.product.name === product.name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ product, quantity });
    }

    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    await cart.save();

    res.json(cart);
};

exports.updateCartItem = async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (cart) {
        const item = cart.items.find(item => item.product._id.toString() === productId);

        if (item) {
            item.quantity = quantity;
            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
};

exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (cart) {
        cart.items = cart.items.filter(item => item.product._id.toString() !== productId);
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        await cart.save();
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
};
