import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './PlantDetail.css';

const PlantDetail = () => {
  const location = useLocation(); // Get location object
  const plant = location.state; // Access the passed plant object

  if (!plant) {
    return <p>No plant details available.</p>;
  }

  return (
    <div className="plant-detail">
      <h2>{plant.name}</h2>
      <img src={`http://localhost:4000/images/${plant.image}`} alt={plant.name} />
      <p><strong>Scientific Name:</strong> {plant.scientificName}</p>
      <p><strong>Description:</strong> {plant.description}</p>
      <p><strong>Price:</strong> Rs.{plant.price}</p>
      <p><strong>Stock:</strong> {plant.countInStock}</p>
      <p><strong>Category:</strong> {plant.category}</p>
    </div>
  );
};

export default PlantDetail;
