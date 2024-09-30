import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { StoreContext } from '../../context/StoreContext';
import './ProductList.css';

const ProductList = () => {
  const { plants, fetchplants, addToCart } = useContext(StoreContext); // Add addToCart function
  const navigate = useNavigate(); // Initialize useNavigate

  // Local state for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch plants when component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchplants();
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Failed to fetch plants');
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchplants]);

  // Handle click event to add the plant to the cart and navigate to the cart page
  const handleAddToCart = (plant) => {
    addToCart(plant); // Call addToCart function from context
    alert(`${plant.name} has been added to your cart!`);
    navigate('/cart'); // Navigate to Cart page after adding the item
  };

  if (loading) {
    return <p>Loading plants...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Plant List</h2>
      <div className="product-grid">
        {plants.length === 0 ? (
          <p>No products available</p>
        ) : (
          plants.map((plant) => (
            <div
              key={plant._id}
              className="product-card"
            >
              <img
                src={`http://localhost:4000/images/${plant.image}`}
                alt={plant.name}
                className="plant-image"
              />
              <h3>{plant.name}</h3>
              <button onClick={() => handleAddToCart(plant)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
