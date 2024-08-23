// eslint-disable-next-line no-unused-vars
import React from 'react'
import './InventoryDashboard.css'



import { Link } from 'react-router-dom';

const  InventoryDashboard = () => {
    return (
      <div className="inventory-container">
      <aside className="sidebar">
        <h2>Inventory</h2>

        
        <Link to='/'><button className="nav-button">Dashboard</button></Link>
        <button className="nav-button">Stock</button>
        <button className="nav-button">Suppliers</button>
        <button className="nav-button">Invoice</button>
        <button className="nav-button">Reports</button>
        <button className="nav-button">Support</button>
      </aside>
      
      <main className="main-content">
        <header className="header">
          <h1>Inventory</h1>
          <input type="search" placeholder="Search..." className="search-bar" />
        </header>
        
        <section className="stock-summary">
          <div className="stock-card">
            <img src="in-stock-icon.png" alt="In Stock" />
            <p>In-Stock</p>
            <h2>70</h2>
          </div>
          <div className="stock-card">
            <img src="all-stock-icon.png" alt="All Stock" />
            <p>All Stock</p>
            <h2>100</h2>
          </div>
          <div className="stock-card">
            <img src="low-stock-icon.png" alt="Low Stock" />
            <p>Low Stock</p>
            <h2>20</h2>
          </div>
          <div className="stock-card">
            <img src="out-stock-icon.png" alt="Out of Stock" />
            <p>Out of Stock</p>
            <h2>10</h2>
          </div>
        </section>
        
        <section className="chart-section">
          <h2>Week stock level summary</h2>
          <div className="chart-placeholder">
            {/* The chart would be implemented here using a library like Chart.js */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default  InventoryDashboard
 
 
