import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { assets } from '../../assets/assets';
import './Myorders.css';
import axios from 'axios';

const OrderDisplay = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [gpsLocation, setGpsLocation] = useState({ latitude: null, longitude: null });
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to fetch orders/cart data from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/carts'); // Replace with your actual API endpoint
      setMyOrders(response.data.carts); // Assuming the API returns an array of orders
      console.log("Fetched cart data: ", response.data.carts);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts

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

  const trackOrder = (orderId) => {
    navigate(`/track-order/${orderId}`); // Navigate to TrackOrder page with the orderId
  };

  return (
    <div>
      <br /><br /><br /><br /><br />
      <h1> Order History</h1>
     
      {myOrders.map((order, orderIndex) => (
        <div key={orderIndex} className="order">
          <h2>Order ID: {orderIndex + 1}</h2>

          
          <ul>
            {order.items && order.items.length > 0 ? (
              order.items.map((item, index) => (
                <li key={index} className="order-item">
                  <img src={assets.parsal} alt="parsal" />
                  <div className="order-item-details">
                    <div><strong>Item:</strong> {item.name}</div>
                    <div><strong>Quantity:</strong> {item.quantity}</div>
                    <div><strong>Price:</strong> RS {item.price}</div>
                  </div>
                </li>
              ))
            ) : (
              <li>No items found in this order.</li>
            )}
          </ul>

          <br /><br />
          <p><strong>Status:</strong> {order.status || "Processing"}</p>
          <br /><br />
          <button onClick={() => trackOrder(orderIndex + 1)}>Track Order</button>

          <br /><br />
        </div>
      ))}
    </div>
  );
};

export default OrderDisplay;
