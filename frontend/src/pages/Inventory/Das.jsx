/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import jspdf-autotable for table support
import './Instocks.css';
import Dashboard from '../../components/Dash/Dashboard';
function ADDstocks() {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    Product_ID: '',
    Product_name: '',
    Price: 0,
    Qty: 0,
    Total_Amount: 0,
  });
  const [editStockId, setEditStockId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [filteredStocks, setFilteredStocks] = useState([]); // State for filtered stocks

  // Fetch all stocks
  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/stocks');
      setStocks(response.data);
      setFilteredStocks(response.data); // Initially, filtered stocks is the same as all stocks
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

  // Function to reset the form
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

  // Search function to filter stocks
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
    <div>
    <div className="dashbard-container">
<Dashboard/>
<main className="main-contet">
<section>
<h2>Stock Management</h2>

{/* Search bar */}
<div className='type1'>
<input
  type="text"
  placeholder="Search by Product Name"
  value={searchTerm}
  onChange={handleSearch}></input>
</div>
</section>
  </main>
  
  </div>
  <h2>Stocks List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
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
                <button onClick={() => handleEdit(stock)}>Edit</button>
                <button onClick={() => deleteStock(stock._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default ADDstocks;
