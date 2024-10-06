import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Myorders.css';

const OrderDisplay = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve orderData from localStorage
    const storedOrderData = localStorage.getItem('orderData');
    if (storedOrderData) {
      setMyOrders([JSON.parse(storedOrderData)]); // Store as an array
    }

    // Retrieve cartItems from localStorage
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Function to track an order
  const trackOrder = (orderId) => {
    alert(`Tracking order ID: ${orderId}`);
    // Implement tracking functionality here
  };

  return (
    <div>
      <br />
      <br />
      <h1>My Orders</h1>
      {myOrders.map((order, orderIndex) => (
        <div key={orderIndex} className="order">
          <h2>Order ID: {orderIndex + 1}</h2>
          <ul>
            {Object.keys(cartItems).map((itemId, index) => {
              const item = cartItems[itemId];
              return (
                <li key={index} className="order-item">
                  <img src={assets.parsal} alt="parsal" />
                  <div className="order-item-details">
                    <div><strong>Item:</strong> {item.name}</div>
                    <div><strong>Quantity:</strong> {item.quantity}</div>
                    <div><strong>Price:</strong> RS {item.price}</div>
                  </div>
                </li>
              );
            })}
          </ul>
          <p><strong>Status:</strong> {order.status || "Processing"}</p>
          <button onClick={() => trackOrder(orderIndex + 1)}>Track Order</button>
        </div>
      ))}
    </div>
  );
};

export default OrderDisplay;
