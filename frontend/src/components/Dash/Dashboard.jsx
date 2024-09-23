// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [isReportOpen, setIsReportOpen] = useState(false); // State to manage report dropdown

  // Function to toggle report section visibility
  const toggleReport = () => {
    setIsReportOpen(!isReportOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Inventory</h2>
        <ul>
          <li><Link to='/InventoryDashboard'><button>Dashboard</button></Link></li>
          <li><Link to='/ADDstocks'><button>Stock</button></Link></li>
          <li><Link to='/Suppliers'><button>Suppliers</button></Link></li>
         

          {/* Support Section */}
          <li><button>Support</button></li>

          {/* Report Section with Hide/Show Sub Tabs */}
          <li>
            <button className="report-btn" onClick={toggleReport}>
              Reports <span>{isReportOpen ? '▲' : '▼'}</span>
            </button>

            {/* Show/Hide report sub-tabs */}
            {isReportOpen && (
              <ul className="report-subtabs">
                <li><Link to='/Das'><button>In Stock</button></Link></li>
                <li><Link to='/outofstocks'><button>Out of Stock</button></Link></li>
                <li><Link to='/LowStock'><button>All Stock</button></Link></li>
               
              </ul>
            )}
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Dashboard;
