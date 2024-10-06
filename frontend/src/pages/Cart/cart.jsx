import React, { useContext } from 'react';
import './cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Cart = () => {
    const { cartItems, setCartItems, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();  // Initialize useNavigate hook
    const deliveryFee = 350;  // Set the delivery fee

    console.log(cartItems);

    const handlePlaceOrder = () => {
        // Navigate to Step01 page on clicking Place Order
        navigate('/step01', { state: { totalWithDelivery: getTotalCartAmount() + deliveryFee } });
    };

    // Function to increase the quantity of an item
    const increaseQuantity = (itemId) => {
        setCartItems((prevItems) => {
            const updatedItems = { ...prevItems };
            updatedItems[itemId].quantity += 1;
            return updatedItems;
        });
    };

    // Function to decrease the quantity of an item
    const decreaseQuantity = (itemId) => {
        setCartItems((prevItems) => {
            const updatedItems = { ...prevItems };
            if (updatedItems[itemId].quantity > 1) {
                updatedItems[itemId].quantity -= 1;
            } else {
                // Optionally remove the item if the quantity goes to 0
                removeFromCart(itemId);
            }
            return updatedItems;
        });
    };

    return (
        <div className='cart'>
            <div className='cart-items'>
                <br></br>
                <br></br>
                <br></br>
                <h2>My Cart</h2>

                {Object.keys(cartItems).length === 0 ? (
                    <div className="empty-cart-container">
                        <p className="empty-cart-message">Your cart is empty</p>
                    </div>
                ) : (
                    <div>
                        <div className='cart-items-list'>
                            <p>Items</p>
                            <p>Title</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total</p>
                            <p>Remove</p>
                        </div>
                        <hr />
                        {Object.keys(cartItems).map((itemId) => {
                            const item = cartItems[itemId];
                            return (
                                <div key={itemId} className='cart-item'>
                                    <img src={item.image} alt={item.name} className='cart-item-image' />
                                    <p>{item.name}</p>
                                    <p>Rs. {item.price}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => decreaseQuantity(itemId)}>-</button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => increaseQuantity(itemId)}>+</button>
                                    </div>
                                    <p>Rs. {item.price * item.quantity}</p>
                                    <button className="remove-button" onClick={() => removeFromCart(itemId)}>
                                        Remove
                                    </button>
                                </div>
                            );
                        })}
                        <hr />
                        <div className='cart-total'>
                            <h3>Subtotal: Rs. {getTotalCartAmount()}</h3>
                            <h3>Delivery Fee: Rs. {deliveryFee}</h3>
                            <h3>Total: Rs. {getTotalCartAmount() + deliveryFee}</h3> {/* Add delivery fee to total */}
                        </div>
                        <div className='place-order'>
                            {/* Button to navigate to Step01 */}
                            <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
