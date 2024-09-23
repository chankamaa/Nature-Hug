/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import 'jspdf-autotable'; // Import jspdf-autotable for table generation
import './InventoryDashboard.css';
import Dashboard from '../../components/Dash/Dashboard';
import axios from 'axios';

const InStock = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  // Fetch all stock data
  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/stocks');
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stock data', error);
    }
  };

  // Filter in-stock items (Qty > 0)
  const inStockItems = stocks.filter(stock => stock.Qty > 0);

  // Function to download in-stock items as a PDF
  const downloadInStockPDF = () => {
    const doc = new jsPDF();

    doc.text('In-Stock Items', 14, 10);

    const tableColumn = ['Product ID', 'Product Name', 'Price', 'Quantity', 'Total Amount'];
    const tableRows = [];

    inStockItems.forEach(stock => {
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
    doc.save('in_stock_items.pdf');
  };

  return (
    <div className="dashboard-container">
      <Dashboard />

      <main className="main-contet">
        {/* In-Stock Items List View */}
        <section className="in-stock-list">
          <h2>In-Stock Items List</h2>
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
              {inStockItems.length > 0 ? (
                inStockItems.map(stock => (
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
                    No in-stock items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Download PDF Button */}
        <section className="pdf-download">
          <button className="download-btn" onClick={downloadInStockPDF}>
            Download In-Stock List as PDF
          </button>
        </section>
      </main>
    </div>
  );
};

export default InStock;
