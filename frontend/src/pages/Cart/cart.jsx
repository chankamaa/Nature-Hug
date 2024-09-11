import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const items = [
            {
                _id: '1',
                name: 'Cactus and Succulents',
                price: 1150,
                image: 'cactus-image-url',
            },
            {
                _id: '2',
                name: 'Spider Plant',
                price: 1400,
                image: 'spider-plant-image-url',
            },
            {
                _id: '3',
                name: 'Jade Plant',
                price: 1175,
                image: 'jade-plant-image-url',
            }
        ];

        const itemQuantities = {
            '1': 1,
            '2': 2,
            '3': 1,
        };

        setCartItems(items.map(item => ({ ...item, quantity: itemQuantities[item._id] })));
    }, []);

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item._id !== itemId));
    };

    const increaseQuantity = (itemId) => {
        setCartItems(cartItems.map(item => 
            item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (itemId) => {
        setCartItems(cartItems.map(item => 
            item._id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className='cart'>
            <div className='cart-items'>
    
                <br></br>
                <br></br>
                <br></br>
                 <br></br>
                 <h2>My Cart</h2>
                <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {cartItems.map((item, index) => (
                    <div key={item._id}>
                        <div className='cart-items-title cart-items-item'>
                            <img src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>Rs {item.price}</p>
                            <div className="quantity-controls">
                                <button onClick={() => decreaseQuantity(item._id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item._id)}>+</button>
                            </div>
                            <p>Rs {item.price * item.quantity}</p>
                            <button onClick={() => removeFromCart(item._id)}>Remove</button>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p>Rs {getTotal()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>Rs 350</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Total</p>
                    <p>Rs {getTotal() + 350}</p>
                </div>
            </div>
            <button onClick={() => navigate('/Step01')}>Proceed to Checkout</button>
        </div>
    );
};

export default Cart;
