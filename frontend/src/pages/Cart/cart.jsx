import React, { useContext } from 'react';
import './cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const { cartItems, setCartItems, removeFromCart, getTotalCartAmount, orderData, clearCart } = useContext(StoreContext);
    const navigate = useNavigate();
    const deliveryFee = 350;

    // Function to handle placing an order
    const handlePlaceOrder = async () => {
        const totalWithDelivery = getTotalCartAmount() + deliveryFee;

        // Validate user data before proceeding to checkout
        if (!orderData || !orderData.firstName || !orderData.lastName || !orderData.email) {
            console.error('User information is incomplete! Cannot proceed with checkout.');
            alert('Please complete your information before placing the order.');
            return;
        }

        // Prepare the payload with cart and order data to send to the backend
        const orderPayload = {
            items: Object.keys(cartItems).map(itemId => ({
                productId: itemId,
                name: cartItems[itemId].name,
                price: cartItems[itemId].price,
                quantity: cartItems[itemId].quantity
            })),
            deliveryFee: deliveryFee,
            total: totalWithDelivery,
            customerInfo: orderData // Include the user's order information from the context
        };

        try {
            // Make a POST request to the backend to save the cart and order data
            const response = await axios.post('http://localhost:4000/api/carts/add', orderPayload);

            if (response.status === 201 || response.status === 200) {
                // Handle successful order creation
                console.log('Order saved successfully:', response.data);
                alert('Order placed successfully!');
                // clearCart();  // Clear the cart after placing the order
                navigate('/step01', { state: { totalWithDelivery } }); // Redirect to step01 with total
            } else {
                console.error('Unexpected response. Status:', response.status, 'Data:', response.data);
                alert('Something went wrong! Please try again.');
            }
        } catch (error) {
            // Handle any errors that occur during the order process
            console.error('Error saving the order:', error.response ? error.response.data : error.message);
            alert('Failed to place the order. Please try again later.');
        }
    };

    // Function to increase the quantity of a specific item in the cart
    const increaseQuantity = (itemId) => {
        setCartItems((prevItems) => {
            const updatedItems = { ...prevItems };
            updatedItems[itemId].quantity += 1;
            return updatedItems;
        });
    };

    // Function to decrease the quantity of a specific item in the cart
    const decreaseQuantity = (itemId) => {
        setCartItems((prevItems) => {
            const updatedItems = { ...prevItems };
            if (updatedItems[itemId].quantity > 1) {
                updatedItems[itemId].quantity -= 1;
            } else {
                removeFromCart(itemId);
            }
            return updatedItems;
        });
    };

    // Function to remove an item from the cart
    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
    };

    // Check if the cart is empty
    const isCartEmpty = Object.keys(cartItems).length === 0;

    return (
        <div className='cart'>
            <br></br><br></br>
            <h2>My Cart</h2>
            {isCartEmpty ? (
                <div className="empty-cart-container">
                    <p className="empty-cart-message">Your cart is empty</p>
                </div>
            ) : (
                <div className="cart-content">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(cartItems).map((itemId) => {
                                const item = cartItems[itemId];
                                return (
                                    <tr key={itemId}>
                                        <td>
                                            <img src={`http://localhost:4000/images/${item.image || 'placeholder.png'}`} alt={item.name} className='cart-item-image' />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>Rs. {item.price}</td>
                                        <td>
                                            <div className="quantity-controls">
                                                <button className="quantity-button" onClick={() => decreaseQuantity(itemId)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button className="quantity-button" onClick={() => increaseQuantity(itemId)}>+</button>
                                            </div>
                                        </td>
                                        <td>Rs. {item.price * item.quantity}</td>
                                        <td>
                                            <button className="remove-button" onClick={() => handleRemoveItem(itemId)}>x</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="cart-summary">
                        <div className="cart-totals">
                            <p className="subtotal">Subtotal: Rs. {getTotalCartAmount()}</p>
                            <p className="delivery-fee">Delivery Fee: Rs. {deliveryFee}</p>
                            <h3 className="total-amount">Total: Rs. {getTotalCartAmount() + deliveryFee}</h3>
                            <button
                                className="checkout-button"
                                onClick={handlePlaceOrder}
                                disabled={isCartEmpty}  // Disable checkout button if the cart is empty
                            >
                                Proceed to Checkout
                            </button>
                        </div>

                        <div className="promo-code">
                            <p>If you have a coupon code, please apply it below</p>
                            <input type="text" className="promo-input" placeholder="Promo code" />
                            <button className="submit-button">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
