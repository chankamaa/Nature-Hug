/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './Instocks.css';
import Dashboard from '../../components/Dash/Dashboard';
import logo from '../../assets/logo.png'; // Assuming the logo is stored in assets folder

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
  const [errors, setErrors] = useState({}); // Error handling for validation

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

  // Validation function for numeric fields
  const validateNumberInput = (value) => /^[0-9]*\.?[0-9]*$/.test(value); // Allow numbers and one decimal point

  // Adding/editing stock items
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  // Calculate total amount for the current stock
  const calculateTotal = (price, qty) => {
    const totalAmount = parseFloat(price) * parseInt(qty);
    return totalAmount;
  };

  // Handle price change and restrict non-numeric inputs
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (validateNumberInput(value)) {
      setNewStock((prevState) => ({
        ...prevState,
        Price: value,
        Total_Amount: calculateTotal(value, prevState.Qty),
      }));
      setErrors((prevErrors) => ({ ...prevErrors, Price: '' })); // Clear errors if valid
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, Price: 'Price must be a valid number' }));
    }
  };

  // Handle quantity change and restrict non-numeric inputs
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (validateNumberInput(value)) {
      setNewStock((prevState) => ({
        ...prevState,
        Qty: value,
        Total_Amount: calculateTotal(prevState.Price, value),
      }));
      setErrors((prevErrors) => ({ ...prevErrors, Qty: '' })); // Clear errors if valid
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, Qty: 'Quantity must be a valid number' }));
    }
  };

  // Add a new stock item
  const addStock = async (e) => {
    e.preventDefault();
    if (!errors.Price && !errors.Qty) {
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
    }
  };

  // Update an existing stock item
  const updateStock = async (id) => {
    if (!errors.Price && !errors.Qty) {
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
    }
  };

  // Delete a stock item with confirmation alert
  const deleteStock = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this stock?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/stocks/${id}`);
        fetchStocks();
        alert('Stock deleted successfully!');
      } catch (error) {
        console.error('Error deleting stock:', error);
      }
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
    setEditStockId(stock._id); // unique identifier
  };

  // Download stocks data as PDF including logo and header
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Header with logo, company details, and date
    const headerText = [
      "Nature Hug",
      "Address: 54A, Ihala Vitiyala, Karagoda-Uyangoda, Matara",
      "Email: handamama.pvt@gmail.com",
      "Phone: +94 76 258 2337"
    ];
    const currentDate = new Date().toLocaleDateString(); // Get current date

    // Add logo
    doc.addImage(logo, 'PNG', 10, 10, 30, 30); // Assuming logo is loaded from assets folder

    // Add company details
    doc.setFontSize(12);
    headerText.forEach((line, index) => {
      doc.text(line, 50, 15 + (index * 5)); // Adjust position of text
    });

    // Add date
    doc.text(`Date: ${currentDate}`, 150, 15); // Date position

    // Add a title for the table
    doc.setFontSize(16);
    doc.text('Stock Management Report', 14, 50);

    // Define table columns and rows
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

    // AutoTable for stock data
    doc.autoTable(tableColumn, tableRows, { startY: 60 });
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

                <label>Unit Price:</label>
                <input type="text" name="Price" placeholder='Price' value={newStock.Price} onChange={handlePriceChange} required />
                {errors.Price && <p className="error-message">{errors.Price}</p>}

                <label>Stock:</label>
                <input type="text" name="Qty" placeholder='Qty' value={newStock.Qty} onChange={handleQuantityChange} required />
                {errors.Qty && <p className="error-message">{errors.Qty}</p>}

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
