/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './InventoryDashboard.css';
import Dashboard from '../../components/Dash/Dashboard';
import axios from 'axios';
import { assets } from '../../assets/assets';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryDashboard = () => {
  const [stockLevels, setStockLevels] = useState({
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
    allStock: 0,
  });

  useEffect(() => {
    fetchStockLevels();
  }, []);

  const fetchStockLevels = async () => {
    const response = await axios.get('http://localhost:4000/api/stocks/levels');
    const { inStock, lowStock, outOfStock } = response.data;

    //  all stock
    const allStock = inStock + lowStock + outOfStock;

    setStockLevels({
      inStock,
      lowStock,
      outOfStock,
      allStock,
    });
  };

  // bar chart
  const chartData = {
    labels: ['In Stock', 'Low Stock', 'Out of Stock', 'All Stock'],
    datasets: [
      {
        label: 'Stock Levels',
        data: [stockLevels.inStock, stockLevels.lowStock, stockLevels.outOfStock, stockLevels.allStock],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Levels Overview',
      },
    },
  };

  return (
    <div className="dashboard-container">
      <Dashboard />

      <main className="main-contet">
<h1 style={{textAlign:'center'}}>Inventory Dashboard</h1>
        <section className="stock-cards">
          <div className="card">
            <img src={assets.Moon_valley_plant} alt="In Stock" />
            <h3>In-Stock</h3>
            <p>{stockLevels.inStock}</p>
          </div>
          <div className="card">
            <img src={assets.Moon_valley_plant} alt="All Stock" />
          
            <h3>All Stock</h3>
            <p>{stockLevels.allStock}</p>
          </div>
          
          <div className="card">
            <img src={assets.Moon_valley_plant} alt="Out of Stock" />
            <h3>Out of Stock</h3>
            <p>{stockLevels.outOfStock}</p>
          </div>
        </section>

        {/* Bar Chart */}
        <section className="chart">
          <h2>Stock Level Bar Chart</h2>
          <Bar data={chartData} options={chartOptions} />
        </section>
      </main>
    </div>
  );
};

export default InventoryDashboard;
