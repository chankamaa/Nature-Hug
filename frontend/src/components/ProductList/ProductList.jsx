import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { StoreContext } from '../../context/StoreContext';
import './ProductList.css';

const ProductList = () => {
  const { plants, fetchplants } = useContext(StoreContext);
  const navigate = useNavigate(); // Initialize useNavigate

  // Local state for loading, error handling, search, filter, and sorting
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [filteredPlants, setFilteredPlants] = useState([]); // Filtered plants based on search
  const [categoryFilter, setCategoryFilter] = useState('All'); // Category filter state
  const [priceSort, setPriceSort] = useState('none'); // Sorting state for price
  const [priceRange, setPriceRange] = useState([0, 10000]); // Price range filter

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

  // Handle search, category filter, and price sorting
  useEffect(() => {
    let filtered = plants;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((plant) =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter((plant) => plant.category === categoryFilter);
    }

    // Apply price sorting
    if (priceSort === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Apply price range filter
    filtered = filtered.filter(
      (plant) => plant.price >= priceRange[0] && plant.price <= priceRange[1]
    );

    setFilteredPlants(filtered);
  }, [searchTerm, categoryFilter, priceSort, priceRange, plants]);

  // Handle click event to navigate to plant details page
  const handleCardClick = (plant) => {
    navigate(`/plants/${plant._id}`, { state: plant }); // Pass the whole plant object as state
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
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for plants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        className="search-bar"
      />
      
      {/* Category Filter */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="category-filter"
      >
        <option value="All">All Categories</option>
        <option value="Indoor">Indoor</option>
        <option value="Outdoor">Outdoor</option>
        <option value="Pet Friendly">Pet Friendly</option>
        <option value="Pots">Pots</option>
      </select>

      {/* Price Sorting */}
      <select
        value={priceSort}
        onChange={(e) => setPriceSort(e.target.value)}
        className="price-sort"
      >
        <option value="none">Sort by Price</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>

      {/* Price Range Filter */}
      <div className="price-range">
        <label>Price Range:</label>
        <input
          type="number"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          min="0"
        />
        <span>to</span>
        <input
          type="number"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          max="10000"
        />
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredPlants.length === 0 ? (
          <p>No plants found</p>
        ) : (
          filteredPlants.map((plant) => (
            <div
              key={plant._id}
              className="product-card"
              onClick={() => handleCardClick(plant)} // Pass plant object on click
            >
              <img
                src={`http://localhost:4000/images/${plant.image}`}
                alt={plant.name}
                className="plant-image"
              />
              <h3>{plant.name}</h3>
              <p>Rs. {plant.price}</p>
              <button>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
