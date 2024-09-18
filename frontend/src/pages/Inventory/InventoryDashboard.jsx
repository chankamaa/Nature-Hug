/* eslint-disable no-unused-vars */

import React from 'react'
import './InventoryDashboard.css'
import Dashboard from '../../components/Dash/Dashboard';
import  { useState, useEffect } from 'react';
import axios from 'axios';

const  InventoryDashboard = () => {
    const [stockLevels, setStockLevels] = useState({
        inStock: 0,
        lowStock: 0,
        outOfStock: 0,
      });
    
      useEffect(() => {
        
        fetchStockLevels();
      }, []);
    
     
      const fetchStockLevels = async () => {
        const response = await axios.get('http://localhost:4000/api/stocks/levels');
        setStockLevels(response.data);
      };
    
    return (
      <div className="dashboard-container"> 
<Dashboard/>
       
        <main className="maincontet">
          

                {/* Stock Summary Cards */}
                <section className="stock-cards">
                    <div className="card">
                        <img src="in-stock-icon.png" alt="In Stock" />
                        <h3>In-Stock</h3>
                        <p>{stockLevels.inStock}</p>
                    </div>
                   <div className="card">
                        <img src="all-stock-icon.png" alt="All Stock" />
                        <h3>All Stock</h3>
                        <p>100</p>
                    </div>
                    <div className="card">
                        <img src="low-stock-icon.png" alt="Low Stock" />
                        <h3>Low Stock</h3>
                        <p>{stockLevels.lowStock}</p>
                    </div>
                    <div className="card">
                        <img src="out-stock-icon.png" alt="Out of Stock" />
                        <h3>Out of Stock</h3>
                        <p>{stockLevels.outOfStock}</p>
                    </div>
                </section>

                {/* Stock Level Summary Chart */}
                <section className="chart">
                    <h2>Week stock level summary</h2>
                    <div className="bar-chart">
                        <div className="bar" style={{ height: '60%' }}>Mon</div>
                        <div className="bar" style={{ height: '60%' }}>Tue</div>
                        <div className="bar" style={{ height: '60%' }}>Wed</div>
                        <div className="bar" style={{ height: '60%' }}>Thu</div>
                        <div className="bar" style={{ height: '60%' }}>Fri</div>
                        <div className="bar" style={{ height: '60%' }}>Sat</div>
                        <div className="bar" style={{ height: '20%' }}>Sun</div>
                    </div>
                </section>
            </main>

            
     </div>
  );
};

export default  InventoryDashboard
 
 
