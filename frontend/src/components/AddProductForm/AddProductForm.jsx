import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProductForm.css'; // We'll style it separately
import { useLocation, useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're editing an existing product or adding a new one
  const editingProduct = location.state ? location.state.product : null;

  const [productData, setProductData] = useState({
    name: editingProduct?.name || '',
    scientificName: editingProduct?.scientificName || '',
    description: editingProduct?.description || '',
    price: editingProduct?.price || '',
    countInStock: editingProduct?.countInStock || '',
    category: editingProduct?.category || '',
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setProductData(editingProduct);
    }
  }, [editingProduct]);

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
      if (editingProduct) {
        // Update the product
        await axios.put(`http://localhost:4000/api/plants/update/${editingProduct._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Product updated successfully'); // Show success alert
      } else {
        // Add a new product
        await axios.post('http://localhost:4000/api/plants/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Product added successfully'); // Show success alert
      }
      navigate('/admin/product-item'); // Redirect to the product list (ProductItem.jsx)
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('There was an error saving the product!');
    }
  };

  return (
    <div className="mhm">
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
          Category:
          <input type="text" name="category" value={productData.category} onChange={handleChange} required />
        </label>
        <label>
          Image:
          <input type="file" name="image" onChange={handleImageChange} />
        </label>
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AddProductForm;
