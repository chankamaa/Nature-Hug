// OrderDisplay.jsx

import React from 'react';
import { assets } from '../../assets/assets'
import './Myorders.css';

// Sample data for orders with image URLs
const Myorders = [
  {
    id: 1,
    items: [
      { name: 'Cactus and Succulents ', quantity: 1, price: 1150, image: 'url-to-image-of-plant-a' },
      { name: 'Spider Plant', quantity: 2, price: 1400, image: 'url-to-image-of-pot-b' },
      { name: 'Jade Plant', quantity: 1, price: 1175, image: 'url-to-image-of-pot-b' },
    ],
    status: 'Processing',
  },
  
];

const OrderDisplay = () => {
  // Function to track an order
  const trackOrder = (orderId) => {
    alert(`Tracking order ID: ${orderId}`);
    // Implement tracking functionality here
  };

  return (
    <div>
  
      <br />
      <br></br>
      <br></br>
      <br></br>
      <h1>My Orders</h1>
      {Myorders.map((order) => (
        <div key={order.id} className="order">
          <h2>Order ID: {order.id}</h2>
          <ul>
            {order.items.map((item, index) => (
              <li key={index} className="order-item">
                <img src={assets.parsal} alt="parsal" />
                <div className="order-item-details">
                  <div><strong>Item:</strong> {item.name}</div>
                  <div><strong>Quantity:</strong> {item.quantity}</div>
                  <div><strong>Price:</strong> RS{item.price}</div>
                </div>
              </li>
            ))}
          </ul>
          <p><strong>Status:</strong> {order.status}</p>
          <button onClick={() => trackOrder(order.id)}>Track Order</button>
        </div>
      ))}
    </div>
  );
};

export default OrderDisplay;
