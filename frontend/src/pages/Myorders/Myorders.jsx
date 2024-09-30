import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Myorders.css';

const OrderDisplay = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [gpsLocation, setGpsLocation] = useState({ latitude: null, longitude: null });
  
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

    // Get GPS location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGpsLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Dummy function for tracking order
  const trackOrder = (orderId) => {
    console.log(`Tracking order with ID: ${orderId}`);
    // Add tracking functionality if needed
  };

  return (
    <div>
      <br></br><br></br><br></br><br></br><br></br>
      <h1> Order History</h1>
      <br></br><br></br><br></br><br></br>
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
          <br></br><br></br>
          <p><strong>Status:</strong> {order.status || "Processing"}</p>
          <br></br><br></br>
          <button onClick={() => trackOrder(orderIndex + 1)}>Track Order</button>
          <br></br><br></br>
        </div>
      ))}
    </div>
  );
};

export default OrderDisplay;
