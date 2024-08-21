import React from 'react';
import './FullCart.css';
import { assets } from '../../assets/assets'

function FullCart() {
    return (
        <div className="cart-container"><br>
        </br>
        <br>
        </br>
        <br>
        </br>
            <h2>Your Cart</h2>
            <hr className="divider" />
            <div className="cart-item">
            <img src={assets.Cactus} alt="Cactus" />
                <div className="item-details">
                    <h4>Cactus and Succulents</h4>
                    <div className="quantity-control">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                    <p className="price">Rs1150</p>
                    <button className="delete-button">🗑️</button>
                </div>
            </div>
            <div className="cart-item">
            <img src={assets.Spider} alt="Spider" />
                <div className="item-details">
                    <h4>Spider Plant</h4>
                    <div className="quantity-control">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                    <p className="price">Rs1400</p>
                    <button className="delete-button">🗑️</button>
                </div>
            </div>
            <div className="cart-item">
            <img src={assets.Jade} alt="Jade" />
                <div className="item-details">
                    <h4>Jade Plant</h4>
                    <div className="quantity-control">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                    <p className="price">Rs1175</p>
                    <button className="delete-button">🗑️</button>
                </div>
            </div>
            <div className="cart-summary">
                <p>Subtotal: <span className="subtotal">Rs3725</span></p>
                <p className="note">Most items deliver separately. Orders cannot be canceled once placed.</p>
                <button className="checkout-button">Checkout</button>
            </div>
        </div>
    );
}

export default FullCart;
