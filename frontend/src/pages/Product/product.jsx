import React from 'react';
import ProductList from '../../components/ProductList/ProductList'; // Adjust the path to match your file structure

const ProductPage = () => {
  return (
    <div className="product-page">
      <h1>Our Plant Collection</h1>
      <p>Explore our wide variety of plants and choose your favorite!</p>
      
      {/* Add the ProductList component here */}
      <ProductList />
      
    </div>
  );
};

export default ProductPage;
