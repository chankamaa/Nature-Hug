/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import 'jspdf-autotable'; // Import jspdf-autotable for table generation
import './InventoryDashboard.css';
import Dashboard from '../../components/Dash/Dashboard';
import axios from 'axios';

const LOW_STOCK_THRESHOLD = 5; // Define your low stock threshold here

const AllStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  // Fetch all stock data
  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/stocks');
      setStocks(response.data);
      checkLowStock(response.data); // Check for low stock items
    } catch (error) {
      console.error('Error fetching stock data', error);
    }
  };

  // Check for low-stock items and alert
  const checkLowStock = (stockData) => {
    const lowStock = stockData.filter(stock => stock.Qty > 0 && stock.Qty <= LOW_STOCK_THRESHOLD);

    if (lowStock.length > 0) {
      setLowStockItems(lowStock);
      alert(`Warning: There are ${lowStock.length} items with low stock!`);
    }
  };

  // Function to download all stock items as a PDF
  const downloadAllStockPDF = () => {
    const doc = new jsPDF();

    doc.text('All Stock Items', 14, 10);

    const tableColumn = ['Product ID', 'Product Name', 'Price', 'Quantity', 'Total Amount'];
    const tableRows = [];

    stocks.forEach(stock => {
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
    doc.save('all_stock_items.pdf');
  };

  return (
    <div className="dashboard-container">
      <Dashboard />

      <main className="main-contet">
        {/* All Stock Items List View */}
        <section className="all-stock-list">
          <h2>All Stock Items List</h2>
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
              {stocks.length > 0 ? (
                stocks.map(stock => (
                  <tr key={stock._id}>
                    <td>{stock.Product_ID}</td>
                    <td>{stock.Product_name}</td>
                    <td>{stock.Price}</td>
                    <td>{stock.Qty}</td>
                    <td>{stock.Total_Amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No stock items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Download PDF Button */}
        <section className="pdf-download">
          <button className="download-btn" onClick={downloadAllStockPDF}>
            Download All Stock List as PDF
          </button>
        </section>

        {/* Display Low-Stock Items */}
        <section className="low-stock-alert">
          {lowStockItems.length > 0 && (
            <div className="alert alert-warning">
              <h3>Low Stock Items</h3>
              <ul>
                {lowStockItems.map(stock => (
                  <li key={stock._id}>
                    {stock.Product_name} - Only {stock.Qty} left in stock!
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AllStocks;
