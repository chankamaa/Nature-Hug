/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import jspdf-autotable for table generation
import './InventoryDashboard.css';
import Dashboard from '../../components/Dash/Dashboard';
import axios from 'axios';
import './Instocks.css'

const OutOfStocks = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/stocks');
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stock data', error);
    }
  };

  // Filter out-of-stock items
  const outOfStockItems = stocks.filter(stock => stock.Qty === 0);

  // Function to download the out-of-stock list as PDF
  const downloadOutOfStockPDF = () => {
    const doc = new jsPDF();

    doc.text('Out-Of-Stock Items', 14, 10);

    const tableColumn = ['Product ID', 'Product Name', 'Price', 'Quantity', 'Total Amount'];
    const tableRows = [];

    outOfStockItems.forEach(stock => {
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
    doc.save('out_of_stock_items.pdf');
  };

  return (
    <div className="dashboard-container">
      <Dashboard />

      <main className="main-contet">
        {/* Out-Of-Stock Items List View */}
        <section className="out-stock-list">
          <h2 style={{textAlign:"center"}}>Out-Of-Stock Items List</h2>
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
              {outOfStockItems.length > 0 ? (
                outOfStockItems.map(stock => (
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
                    No Out-Of-Stock items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Download PDF Button */}
        <section className="cont">
          <button className="button1" onClick={downloadOutOfStockPDF}>
            Download  PDF
          </button>
        </section>
      </main>
    </div>
  );
};

export default OutOfStocks;
