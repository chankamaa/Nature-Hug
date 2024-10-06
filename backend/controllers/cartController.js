import Cart from '../models/cartModels.js';

// Get cart by user ID
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add item to cart
export const addItemToCart = async (req, res) => {
    const { userId, items } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            cart.items.push(...items);
            cart.total = calculateTotal(cart.items);
            await cart.save();
            res.status(200).json(cart);
        } else {
            cart = new Cart({
                userId,
                items,
                total: calculateTotal(items),
            });
            await cart.save();
            res.status(201).json(cart);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update cart item
export const updateCartItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
                cart.total = calculateTotal(cart.items);
                await cart.save();
                res.status(200).json(cart);
            } else {
                res.status(404).json({ message: 'Item not found in cart' });
            }
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete item from cart
export const removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
            cart.total = calculateTotal(cart.items);
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Utility function to calculate total
const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
