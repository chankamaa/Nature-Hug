import React from 'react';
import './EmptyCart.css';
import { assets } from '../../assets/assets'

function EmptyCart() {
    return (
        <div className="empty-cart-container">
             <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Your Cart</h2>
            <hr className="divider" />
            <div className="empty-message">
                <h3>Oh no! Your cart is empty</h3>
                <p>We recommend checking out:</p>
            </div>
            <div className="recommendations">
                <div className="recommendation-item">
                <img src={assets.indoor} alt="indoor" />
                    <p>Indoor Plants</p>
                </div>
                <div className="recommendation-item">
                <img src={assets.outdoor} alt="outdoor" />
                    <p>Outdoor Plants</p>
                </div>
                <div className="recommendation-item">
                <img src={assets.pot} alt="pot" />
                    <p>Pots</p>
                </div>
                <div className="recommendation-item">
                <img src={assets.pet} alt="pet" />
                    <p>Pet friendly plants</p>
                </div>
            </div>
        </div>
    );
}

export default EmptyCart;
