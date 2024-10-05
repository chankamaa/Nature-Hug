import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './ProductList.css';

const ProductList = () => {
  const { plants, fetchplants, addToCart, increaseQuantity, decreaseQuantity, cartItems } = useContext(StoreContext); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchplants();
        setLoading(false); 
      } catch (err) {
        setError('Failed to fetch plants');
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchplants]);

  const getItemQuantity = (plantId) => {
    return cartItems[plantId] ? cartItems[plantId].quantity : 0;
  };

  if (loading) {
    return <p>Loading plants...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <div className="product-grid">
        {plants.length === 0 ? (
          <p>No products available</p>
        ) : (
          plants.map((plant) => (
            <div key={plant._id} className="product-card">
              <img src={`http://localhost:4000/images/${plant.image}`} alt={plant.name} className="plant-image" />
              <h3>{plant.name}</h3>
              <p>Rs. {plant.price}</p>

              
              {/* Render add/remove buttons */}
              <div className="cart-controls">
                {getItemQuantity(plant._id) > 0 ? (
                  <div className="quantity-controls">
                    <button className="decrease-btn" onClick={() => decreaseQuantity(plant._id)}>-</button>
                    <span className="quantity-count">{getItemQuantity(plant._id)}</span>
                    <button className="increase-btn" onClick={() => increaseQuantity(plant._id)}>+</button>
                  </div>
                ) : (
                  <button className="add-to-cart-btn" onClick={() => addToCart(plant)}>+</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
