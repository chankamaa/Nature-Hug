import Cart from '../models/cartModels.js';
import nodemailer from 'nodemailer';

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

// Example of creating a new order in the backend
const createOrder = async (req, res) => {
    try {
      const { items, userId, status } = req.body;
      // Generate a unique order number
      const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
      // Create new order object
      const newOrder = new Order({
        userId,
        items,
        orderNumber,  // Save order number
        status: status || 'In Progress',
      });
  
      // Save the order to the database
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error });
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
    const { userId, status } = req.body; // Ensure you are getting the correct data
    
    try {
        // Find the cart by userId
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Update the status field
        cart.status = status;
        await cart.save();
      
        // Send the updated cart back as a response
        res.status(200).json({ message: 'Status updated successfully', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  
  


// Remove item from cart
export const removeCart = async (req, res) => {
    try {
        // Find the cart by its ID and delete it
        const cart = await Cart.findByIdAndDelete(req.params.userid);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Return success response
        res.status(200).json({ message: 'Cart deleted successfully' });
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
