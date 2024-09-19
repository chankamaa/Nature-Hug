import React from 'react';
import AddProductForm from '../components/AddProductForm/AddProductForm'; 
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
          <AddProductForm />
        </section>   {/* <section className="dashboard-section">
          <h2>Manage Promotions</h2>
          <ManagePromotions />
        </section>
         */}
          <section className="dashboard-section">
          <h2>All Promo Codes</h2>
          <PromoCodeList /> {/* Add the PromoCodeList component */}
        </section>

        {/* Add more sections for other admin functionalities */}
      </div>
    </div>
  );
};

export default AdminDashboard;
