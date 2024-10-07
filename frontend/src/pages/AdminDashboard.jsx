/* eslint-disable no-unused-vars */
import React from 'react';
import Sidebar from '../components/Admin/Sidebar'; // Import the Sidebar
import './AdminDashboard.css'; 
import ManagePromotions from '../components/Sales/ManagePromotions'
import PromoCodeList from '../components/Sales/PromoCodeList';
import './AdminDashboard.css';
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar /> {/* Sidebar component */}

      <div className="admin-dashboard-content">
        <h1 className='headline'>Admin Dashboard</h1>

        {/* Add different admin functionalities here */}
        <section className="dashboard-section">
          <h2>Add Plant</h2>
          
        </section>   {/* <section className="dashboard-section">
          <h2>Manage Promotions</h2>
          <ManagePromotions />
        </section>
         */}
          

        {/* Add more sections for other admin functionalities */}
      </div>
    </div>
  );
};

export default AdminDashboard;
