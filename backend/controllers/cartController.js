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

// Add item to cart (create a new cart if it doesn't exist)
// export const addItemToCart = async (req, res) => {
//     const { userId, items } = req.body;

//     try {
//         let cart = await Cart.findOne({ userId });

//         if (cart) {
//             // Push the new items into the cart
//             cart.items.push(...items);
//             cart.total = calculateTotal(cart.items);
//             await cart.save();
//             res.status(200).json({ message: 'Items added to cart', cart });
//         } else {
//             // Create a new cart if it doesn't exist
//             cart = new Cart({
//                 userId,
//                 items,
//                 total: calculateTotal(items),
//             });
//             await cart.save();
//             res.status(201).json({ message: 'New cart created', cart });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
export const addItemToCart = async (req, res) => {
    const { userId, items } = req.body;

    try {
        // Create a new cart with the items passed in the request
        const newCart = new Cart({
            userId,
            items,
            total: calculateTotal(items),
        });

        // Save the new cart to the database
        await newCart.save();

        // Respond with a success message and the newly created cart
        res.status(201).json({ message: 'New cart created', cart: newCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update cart status
export const updateCartStatus = async (req, res) => {
    const { userId, status } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Update cart status
        cart.status = status;
        await cart.save();

        res.status(200).json({ message: 'Cart status updated successfully', cart });
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
            // Remove item and recalculate total
            cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
            cart.total = calculateTotal(cart.items);
            await cart.save();
            res.status(200).json({ message: 'Item removed from cart', cart });
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all carts (with optional pagination)
export const getAllCarts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const carts = await Cart.find().skip(skip).limit(limit);
        const totalCarts = await Cart.countDocuments();

        res.status(200).json({
            totalPages: Math.ceil(totalCarts / limit),
            currentPage: page,
            carts,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Utility function to calculate total price in the cart
const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
