/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './Instocks.css';
import Dashboard from '../../components/Dash/Dashboard';

function ADDstocks() {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    Product_ID: '',
    Product_name: '',
    Price: '',
    Qty: '',
    Total_Amount: '',
  });
  const [editStockId, setEditStockId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // search term
  const [filteredStocks, setFilteredStocks] = useState([]); // filtered stocks

  // Fetch all stocks
  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/stocks');
      setStocks(response.data);
      setFilteredStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // Handle input changes for adding/editing stock items
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  // Calculate total amount for the current stock
  const calculateTotal = (price, qty) => {
    const totalAmount = parseFloat(price) * parseInt(qty);
    return totalAmount;
  };

  // Add a new stock item
  const addStock = async (e) => {
    e.preventDefault();
    try {
      const calculatedTotal = calculateTotal(newStock.Price, newStock.Qty);
      const stockToAdd = {
        ...newStock,
        Total_Amount: calculatedTotal,
      };
      await axios.post('http://localhost:4000/api/stocks', stockToAdd);
      fetchStocks();
      resetForm();
      alert('Stock added successfully!'); // Show success alert
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  // Update an existing stock item
  const updateStock = async (id) => {
    try {
      const calculatedTotal = calculateTotal(newStock.Price, newStock.Qty);
      const stockToUpdate = {
        ...newStock,
        Total_Amount: calculatedTotal,
      };
      await axios.put(`http://localhost:4000/api/stocks/${id}`, stockToUpdate);
      fetchStocks();
      setEditStockId(null);
      resetForm();
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  // Delete a stock item
  const deleteStock = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/stocks/${id}`);
      fetchStocks();
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  // Reset the form
  const resetForm = () => {
    setNewStock({
      Product_ID: '',
      Product_name: '',
      Price: 0,
      Qty: 0,
      Total_Amount: 0,
    });
  };

  // Handle price change and calculate total
  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setNewStock((prevState) => ({
        ...prevState,
        Price: newPrice,
        Total_Amount: calculateTotal(newPrice, prevState.Qty),
      }));
    }
  };

  // Handle quantity change and calculate total
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setNewStock((prevState) => ({
        ...prevState,
        Qty: newQuantity,
        Total_Amount: calculateTotal(prevState.Price, newQuantity),
      }));
    }
  };

  // Search and filter stocks
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = stocks.filter((stock) =>
      stock.Product_name.toLowerCase().includes(searchValue)
    );

    setFilteredStocks(filtered);
  };

  // Submit function to either add or update the stock
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editStockId !== null) {
      updateStock(editStockId);
    } else {
      addStock(e);
    }
  };

  // Handle editing an existing stock
  const handleEdit = (stock) => {
    setNewStock(stock);
    setEditStockId(stock._id); // Assuming stock._id is the unique identifier
  };

  // Download stocks data as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text('Stock Management Report', 14, 10);

    const tableColumn = ['Product ID', 'Product Name', 'Price', 'Quantity', 'Total Amount'];
    const tableRows = [];

    filteredStocks.forEach((stock) => {
      const stockData = [
        stock.Product_ID,
        stock.Product_name,
        stock.Price,
        stock.Qty,
        stock.Total_Amount,
      ];
      tableRows.push(stockData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('stocks_report.pdf');
  };

  return (
    <div className='mmm'>
      <div className="dashbard-container">
        <Dashboard />

        <main className="main-contet">
          <section>
            <h1 style={{ textAlign: "center" }}>Stock Management</h1>
            <form onSubmit={handleSubmit}>
              <div className='type1'>
                <input type="text" placeholder="Search by Product Name" value={searchTerm} onChange={handleSearch} />
                <label>Product ID:</label>
                <input type="text" name="Product_ID" value={newStock.Product_ID} placeholder='Product_ID' onChange={handleChange} required />
                <label>Product Name:</label>
                <input type="text" placeholder='Product_name' name="Product_name" value={newStock.Product_name} onChange={handleChange} required />
                <label>Price:</label>
                <input type="text" name="Price" placeholder='Price' value={newStock.Price} onChange={handlePriceChange} required />
                <label>Stocks:</label>
                <input type="text" name="Qty" placeholder='Qty' value={newStock.Qty} onChange={handleQuantityChange} required />
                <label>Total Amount:</label>
                <input type="text" name="Total_Amount" placeholder='Total_Amount' value={newStock.Total_Amount} readOnly />
                <button className='button1' type='submit'> {editStockId !== null ? 'Update Stock' : 'Add Stock'}</button>
                <button className='button2' type='button' onClick={() => alert('Remove button clicked!')}>Remove</button>
              </div>
            </form>
          </section>
        </main>
      </div>
      <h2 style={{ textAlign: 'center' }}>Stocks List</h2>
      <main className="main-contet">
        <table style={{ width: '100%' }} border="1">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stocks</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock) => (
              <tr key={stock._id}>
                <td>{stock.Product_ID}</td>
                <td>{stock.Product_name}</td>
                <td>{stock.Price}</td>
                <td>{stock.Qty}</td>
                <td>{stock.Total_Amount}</td>
                <td>
                  <button className='ed1' onClick={() => handleEdit(stock)}>Edit</button>
                  <button className='de1' onClick={() => deleteStock(stock._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <div className='cont'>
        <button className='button1' onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
  );
}

export default ADDstocks;
