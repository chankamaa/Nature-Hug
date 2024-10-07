import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TrackOrder.css';

const TrackOrder = () => {
  const { orderId } = useParams(); // Get orderId from URL params

  // Simulate order status with timestamps and events
  const statuses = [
    { status: "Order Placed", timestamp: "2024-10-01 10:00 AM" },
    { status: "Processing", timestamp: "2024-10-01 11:00 AM" },
    { status: "Shipped", timestamp: "2024-10-02 09:30 AM" },
    { status: "Out for Delivery", timestamp: "2024-10-02 01:00 PM" },
    { status: "Delivered", timestamp: "2024-10-02 05:30 PM" },
  ];

  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [gpsLocation, setGpsLocation] = useState({ latitude: null, longitude: null });
  const [eta, setEta] = useState("Calculating...");
  const [isCancelled, setIsCancelled] = useState(false); // New state for cancelled orders
  const [mapType, setMapType] = useState('roadmap'); // New state for toggling map type

  useEffect(() => {
    // Simulate fetching real-time GPS location (could be an API call)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGpsLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }

    // Simulate ETA calculation based on GPS location and order progress
    const calculateEta = () => {
      if (currentStatusIndex >= 3) {
        setEta("2 hours remaining"); // Simulate ETA when "Out for Delivery"
      } else if (currentStatusIndex === 2) {
        setEta("4 hours remaining"); // Simulate ETA when "Shipped"
      } else {
        setEta("Pending..."); // ETA before shipping is determined
      }
    };

    const interval = setInterval(() => {
      calculateEta();
      // Move to the next status every few seconds (simulating progress)
      setCurrentStatusIndex((prevIndex) => {
        if (prevIndex < statuses.length - 1) {
          return prevIndex + 1;
        }
        return prevIndex;
      });
    }, 8000); // 8 seconds for demo; can be changed to real-time updates

    return () => clearInterval(interval);
  }, [currentStatusIndex]);

  const getProgressPercentage = () => {
    return ((currentStatusIndex + 1) / statuses.length) * 100;
  };

  const handleMapTypeChange = (newType) => {
    setMapType(newType);
  };

  // Handle cancel order logic
  const handleCancelOrder = () => {
    if (currentStatusIndex >= 3) {
      alert("Order is already out for delivery or delivered. Cannot cancel.");
    } else {
      setIsCancelled(true);
      alert("Order has been successfully cancelled.");
    }
  };

  // Render the Google Map
  const renderMap = () => {
    return (
      <div className="map-container">
        <iframe
          title="Google Map"
          width="100%"
          height="450"
          frameBorder="0"
          src={`https://maps.google.com/maps?q=${gpsLocation.latitude},${gpsLocation.longitude}&z=15&output=embed&t=${mapType}`}
          allowFullScreen
        ></iframe>
       
      </div>
    );
  };

  return (
    <div className="track-order-container">
      <h1>Track Your Order</h1>
      <div className="order-details">
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Current Status:</strong> {isCancelled ? "Cancelled" : statuses[currentStatusIndex].status}</p>
        <p><strong>ETA:</strong> {eta}</p>
      </div>

      {/* Display Order Timeline */}
      <div className="timeline">
        {statuses.map((statusObj, index) => (
          <div key={index} className={`timeline-item ${index <= currentStatusIndex ? 'completed' : ''}`}>
            <div className="status-circle" title={`Status: ${statusObj.status}, Time: ${statusObj.timestamp}`}></div>
            <div className="status-details">
              <p><strong>{statusObj.status}</strong></p>
              <p>{statusObj.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${getProgressPercentage()}%`, transition: 'width 1s ease-in-out' }}></div>
      </div>

      {/* Render the map */}
      <h2>Current Location (Approx.)</h2>
      {gpsLocation.latitude && gpsLocation.longitude ? renderMap() : <p>Fetching location...</p>}

      {/* Cancel Order / Support */}
      <div className="support-section">
        {!isCancelled && currentStatusIndex < 3 && (
          <button className="cancel-order" onClick={handleCancelOrder}>
            Cancel Order
          </button>
        )}
        <button className="contact-support">Contact Support</button>
      </div>
    </div>
  );
};

export default TrackOrder;
