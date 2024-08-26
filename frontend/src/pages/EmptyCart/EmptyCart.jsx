import React from 'react';
import './EmptyCart.css';

const EmptyCart = () => {
    const recommendations = [
        { id: 1, name: 'Indoor Plants', image: 'indoorplants.jpg' },
        { id: 2, name: 'Outdoor Plants', image: 'outdoorplants.jpg' },
        { id: 3, name: 'Pots', image: 'pots.jpg' },
        { id: 4, name: 'Pet Friendly Plants', image: 'petfriendlyplants.jpg' },
    ];

    return (
        <div className="empty-cart-container">
            <h2>Your Cart</h2>
            <p className="empty-cart-message">Oh no! Your cart is empty</p>
            <p className="recommendation-text">We recommend checking out:</p>
            <div className="recommendations">
                {recommendations.map(item => (
                    <div className="recommendation-item" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmptyCart;
