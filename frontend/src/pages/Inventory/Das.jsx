/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StockManagement() {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    Product_ID: '',
    Product_name: '',
    Price: 0,
    Qty: 0,
    Total_Amount: 0,
  });
  const [stockLevels, setStockLevels] = useState({
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  });

  useEffect(() => {
    fetchStocks();
    fetchStockLevels();
  }, []);

  const fetchStocks = async () => {
    const response = await axios.get('http://localhost:4000/api/stocks');
    setStocks(response.data);
  };

  const fetchStockLevels = async () => {
    const response = await axios.get('http://localhost:4000/api/stocks/levels');
    setStockLevels(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  const addStock = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/stocks', newStock);
    fetchStocks();
    fetchStockLevels();
    resetForm();
  };

  const resetForm = () => {
    setNewStock({
      Product_ID: '',
      Product_name: '',
      Price: 0,
      Qty: 0,
      Total_Amount: 0,
    });
  };

  return (
    <div>
      <h2>Stock Management</h2>

      <form onSubmit={addStock}>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            name="Product_ID"
            value={newStock.Product_ID}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="Product_name"
            value={newStock.Product_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="Price"
            value={newStock.Price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="Qty"
            value={newStock.Qty}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Total Amount:</label>
          <input type="number" name="Total_Amount" value={newStock.Total_Amount} readOnly />
        </div>

        <button type="submit">Add Stock</button>
      </form>

      <h2>Stock Levels</h2>
      <p>In Stock: {stockLevels.inStock}</p>
      <p>Low Stock: {stockLevels.lowStock}</p>
      <p>Out of Stock: {stockLevels.outOfStock}</p>

      <h2>Stock List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td>{stock.Product_ID}</td>
              <td>{stock.Product_name}</td>
              <td>{stock.Price}</td>
              <td>{stock.Qty}</td>
              <td>{stock.Total_Amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockManagement;
