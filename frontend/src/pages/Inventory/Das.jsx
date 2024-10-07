/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import 'jspdf-autotable'; // Import jspdf-autotable for table generation
import './InventoryDashboard.css';
import Dashboard from '../../components/Dash/Dashboard';
import axios from 'axios';
import logo from '../../assets/logo.png'; // Update the path based on your project structure

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

    // Add logo and company details
    doc.addImage(logo, 'PNG', 10, 10, 30, 30); // Adjust the position and size of the logo

    const headerText = [
      "Nature Hug",
      "Address: 54A, Ihala Vitiyala, Karagoda-Uyangoda, Matara",
      "Email: handamama.pvt@gmail.com",
      "Phone: +94 76 258 2337"
    ];

    doc.setFontSize(12);
    headerText.forEach((line, index) => {
      doc.text(line, 50, 15 + (index * 5)); // Adjust position of text relative to the logo
    });

    // Add current date
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDate}`, 150, 15);

    // Title for the table
    doc.setFontSize(16);
    doc.text('In-Stock Items Report', 14, 50);

    // Define table columns and rows
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

    // AutoTable for stock data
    doc.autoTable(tableColumn, tableRows, { startY: 60 });

    // Save the PDF
    doc.save('in_stock_items.pdf');
  };

  return (
    <div className="dashboard-container">
      <Dashboard />

      <main className="main-contet">
        {/* In-Stock Items List View */}
        <section className="in-stock-list">
          <h2 className='header1'>In-Stock Items List</h2>
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
        <section className="cont">
          <button className="button1" onClick={downloadInStockPDF}>
             In-Stock List 
          </button>
        </section>
      </main>
    </div>
  );
};

export default InStock;
