import React, { useState } from 'react';
import axios from 'axios';
import './AddProductForm.css'; // Add styles if necessary

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    description: '',
    price: '',
    countInStock: '',
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit form to add a new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData();
    for (let key in formData) {
      formDataWithImage.append(key, formData[key]);
    }
    formDataWithImage.append('image', image);

    try {
      const response = await axios.post('http://localhost:4000/api/plants/add', formDataWithImage, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Failed to add product.');
    }
  };

  return (
    <div className="product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        
        <label>Botanical Information:</label>
        <input type="text" name="scientificName" value={formData.scientificName} onChange={handleInputChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>
        
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          min="0"
          step="0.01"
          placeholder="Enter price"
          required
          onKeyPress={(e) => {
            if (!/^\d*\.?\d*$/.test(e.key)) {
              e.preventDefault(); // Prevent entering non-numeric characters
            }
          }}
        />
        <label>Available Stock:</label>
        <input
        type='number'
        name='countInStock'
        value={formData.countInStock}
        onChange={handleInputChange}
        min='0'
        step='1'
        placeholder='Enter available stock'
        required
        />

<form onSubmit={handleSubmit}>
  {/* Available Stock Input */}
  <label>Available Stock:</label>
  <input
    type='number'
    name='countInStock'
    value={formData.countInStock}
    onChange={handleInputChange}
    min='0'
    step='1'
    placeholder='Enter available stock'
    required
  />

  {/* Category Dropdown */}
  <label>Category:</label>
  <select
    name='category'
    value={formData.category}
    onChange={handleInputChange}
    required
  >
    <option value="">Select a Category</option>
    <option value="Indoor">Indoor</option>
    <option value="Outdoor">Outdoor</option>
    <option value="Pet-Friendly">Pet-Friendly</option>
  </select>
</form>


        <label>Image:</label>
        <input type="file" onChange={handleImageChange} required />

        <button type="submit">Add Product</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
