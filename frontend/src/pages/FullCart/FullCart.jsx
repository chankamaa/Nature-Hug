import React, { useState } from 'react';
import './Fullcart.css';

const Fullcart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Cactus and Succulents', price: 1150, quantity: 1, image: 'cactus.jpg' },
        { id: 2, name: 'Spider Plant', price: 1400, quantity: 1, image: 'spiderplant.jpg' },
        { id: 3, name: 'Jade Plant', price: 1175, quantity: 1, image: 'jadeplant.jpg' },
    ]);

    const updateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div className="cart-item" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <div className="quantity-selector">
                                <button onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <p>Rs{item.price}</p>
                        </div>
                        <button className="remove-item" onClick={() => removeItem(item.id)}>🗑️</button>
                    </div>
                ))}
            </div>
            <div className="subtotal">
                <h3>Subtotal:</h3>
                <p>Rs{getTotalPrice()}</p>
            </div>
            <p className="note">Most items deliver separately. Orders cannot be canceled once placed.</p>
            <button className="checkout-button">Checkout</button>
        </div>
    );
};

export default Fullcart;
