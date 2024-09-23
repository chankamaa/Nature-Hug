import React, { useState } from 'react';
import axios from 'axios';
import './AddProductForm.css'; // We'll style it separately

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    scientificName: '',
    description: '',
    price: '',
    countInStock: '',
    category: '',
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in productData) {
      formData.append(key, productData[key]);
    }
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:4000/api/plants/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('There was an error adding the product!', error);
      setMessage('There was an error adding the product!');
    }
  };

  return (
    

    
    <form onSubmit={handleSubmit} className="admin-form">
      <label>
        Name:
        <input type="text" name="name" value={productData.name} onChange={handleChange} required />
      </label>
      <label>
        Scientific Name:
        <input type="text" name="scientificName" value={productData.scientificName} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={productData.description} onChange={handleChange} required />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={productData.price} onChange={handleChange} required />
      </label>
      <label>
        Stock Count:
        <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} required />
      </label>
      <label>
        Category:
        <input type="text" name="category" value={productData.category} onChange={handleChange} required />
      </label>
      <label>
        Image:
        <input type="file" name="image" onChange={handleImageChange} required />
      </label>
      <button type="submit">Add Product</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddProductForm;
